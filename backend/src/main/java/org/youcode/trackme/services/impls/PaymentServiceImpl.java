package org.youcode.trackme.services.impls;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.youcode.trackme.services.PaymentService;

@Service
@Transactional
@Validated
public class PaymentServiceImpl implements PaymentService {
}
