package org.youcode.trackme.services.impls;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.youcode.trackme.common.exceptions.EntityCreationException;
import org.youcode.trackme.common.exceptions.EntityNotFoundException;
import org.youcode.trackme.dtos.payment.PaymentRequestDTO;
import org.youcode.trackme.entities.Payment;
import org.youcode.trackme.entities.enums.PaymentStatus;
import org.youcode.trackme.mappers.PaymentMapper;
import org.youcode.trackme.repositories.PaymentRepository;
import org.youcode.trackme.services.PaymentService;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;

    @Override
    public String createPaymentIntent(PaymentRequestDTO requestDTO) throws StripeException {
        if (requestDTO == null || requestDTO.amount() == null || requestDTO.amount() <= 0) {
            throw new IllegalArgumentException("Le montant doit être positif et non nul.");
        }

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) requestDTO.amount())
                .setCurrency("eur")
                .setDescription("Paiement pour une nouvelle commande")
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);
        System.out.println("PaymentIntent créé avec clientSecret: " + paymentIntent.getClientSecret());

        try {
            Payment payment = paymentMapper.toEntity(requestDTO);
            if (payment == null) {
                throw new EntityCreationException("Le mappage a retourné une entité null.");
            }
            payment.setStatus(PaymentStatus.PENDING);
            payment.setTransactionId(paymentIntent.getId());
            payment = paymentRepository.save(payment);
            System.out.println("Payment sauvegardé avec transactionId: " + payment.getTransactionId());
        } catch (IllegalArgumentException e) {
            System.err.println("Erreur de validation lors du mappage: " + e.getMessage());
            throw new EntityCreationException("Erreur de validation lors de la création du paiement: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Erreur lors du mappage ou de la sauvegarde: " + e.getMessage());
            throw new EntityCreationException("Erreur lors de la création du paiement: " + e.getMessage());
        }

        return paymentIntent.getClientSecret();
    }

    @Override
    public Payment confirmPayment(String transactionId) {
        Payment payment = paymentRepository.findByTransactionId(transactionId)
                .orElseThrow(() -> new EntityNotFoundException("Paiement non trouvé avec transactionId: " + transactionId));
        payment.setStatus(PaymentStatus.SUCCEEDED);
        return paymentRepository.save(payment);
    }
}