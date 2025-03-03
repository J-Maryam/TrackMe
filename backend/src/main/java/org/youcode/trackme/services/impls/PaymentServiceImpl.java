package org.youcode.trackme.services.impls;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    public String createPaymentIntent(PaymentRequestDTO request) throws StripeException {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) (request.amount() * 100)) // Montant en centimes
                .setCurrency("eur")
                .setDescription("Paiement pour une nouvelle commande")
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);

        Payment payment = paymentMapper.toEntity(request);
        payment.setStatus(PaymentStatus.PENDING);
        payment.setTransactionId(paymentIntent.getId());
        paymentRepository.save(payment);

        return paymentIntent.getClientSecret();
    }

    @Override
    public Payment confirmPayment(String transactionId) {
        Payment payment = paymentRepository.findByTransactionId(transactionId)
                .orElseThrow(() -> new EntityNotFoundException("Paiement non trouvé"));
        payment.setStatus(PaymentStatus.SUCCEEDED);
        return paymentRepository.save(payment);
    }
}