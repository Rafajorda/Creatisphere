package com.creatisphere.Backend_Payments_Springboot.application.service_portIn.payments;

import com.creatisphere.Backend_Payments_Springboot.application.dto.payments.PaymentRequest;

import reactor.core.publisher.Mono;
import java.util.Map;

public interface PaymentService {

    Mono<Map<String, Object>> initiatePayment(PaymentRequest paymentRequest);

    Mono<Map<String, Object>> capturePayment(String orderId);

}
