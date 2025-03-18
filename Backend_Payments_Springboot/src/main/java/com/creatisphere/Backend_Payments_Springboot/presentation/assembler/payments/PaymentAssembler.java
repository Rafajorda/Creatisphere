package com.creatisphere.Backend_Payments_Springboot.presentation.assembler.payments;

import lombok.RequiredArgsConstructor;

import java.util.Map;
import org.springframework.stereotype.Component;

import com.creatisphere.Backend_Payments_Springboot.application.dto.payments.PayPalCaptureResponse;
import com.creatisphere.Backend_Payments_Springboot.application.dto.payments.PaymentProcessResponse;

@Component
@RequiredArgsConstructor
public class PaymentAssembler {

    public PaymentProcessResponse toProcessResponse(Map<String, Object> paymentData) {
        return new PaymentProcessResponse(
                (String) paymentData.get("id"),
                (String) paymentData.get("clientSecret"));
    }

    public PayPalCaptureResponse toCaptureResponse(Map<String, Object> captureData) {
        return new PayPalCaptureResponse(
                (String) captureData.get("id"),
                (String) captureData.get("status"));
    }

}
