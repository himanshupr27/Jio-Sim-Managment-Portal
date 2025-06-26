// package com.simmanagmentplatform.Controller;

// import java.io.IOException;
// import java.io.StringWriter;
// import java.security.KeyPair;
// import java.security.KeyPairGenerator;

// import org.bouncycastle.openssl.jcajce.JcaPEMWriter;
// import org.bouncycastle.operator.ContentSigner;
// import org.bouncycastle.operator.jcajce.JcaContentSignerBuilder;
// import org.bouncycastle.pkcs.PKCS10CertificationRequest;
// import org.bouncycastle.pkcs.PKCS10CertificationRequestBuilder;
// import org.bouncycastle.asn1.x500.X500Name;
// import org.bouncycastle.asn1.x509.SubjectPublicKeyInfo;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.simmanagmentplatform.Entity.CSRRequest;

// @RestController
// @RequestMapping("/api/csr")
// public class CSRController {

//     @PostMapping("/generate")
//     public ResponseEntity<String> generateCSR(@RequestBody CSRRequest request) {
//         try {
//             KeyPair keyPair = generateKeyPair();
//             PKCS10CertificationRequest csr = generateCSR(request, keyPair);

//             String csrPem = convertToPem(csr);
//             return ResponseEntity.ok(csrPem);
//         } catch (Exception e) {
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                     .body("Error generating CSR: " + e.getMessage());
//         }
//     }

//     private KeyPair generateKeyPair() throws Exception {
//         KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
//         keyGen.initialize(2048);
//         return keyGen.generateKeyPair();
//     }

//    private PKCS10CertificationRequest generateCSR(CSRRequest request, KeyPair keyPair) throws Exception {
//         X500Name x500Name = new X500Name("C=" + request.getCountry() +
//                 ", ST=" + request.getState() +
//                 ", L=" + request.getLocation() +
//                 ", O=" + request.getOrganization() +
//                 ", OU=" + request.getOrgUnit() +
//                 ", CN=" + request.getCommonName() +
//                 ", EMAIL=" + request.getEmail());

//         // Convert PublicKey to SubjectPublicKeyInfo
//         SubjectPublicKeyInfo subjectPublicKeyInfo = SubjectPublicKeyInfo.getInstance(keyPair.getPublic().getEncoded());

//         // Create CSR request
//         PKCS10CertificationRequestBuilder builder = new PKCS10CertificationRequestBuilder(x500Name, subjectPublicKeyInfo);

//         ContentSigner signer = new JcaContentSignerBuilder("SHA256withRSA")
//                 .build(keyPair.getPrivate());

//         return builder.build(signer);
//     }
    
//     private String convertToPem(PKCS10CertificationRequest csr) throws IOException {
//         StringWriter writer = new StringWriter();
//         JcaPEMWriter pemWriter = new JcaPEMWriter(writer);
//         pemWriter.writeObject(csr);
//         pemWriter.close();
//         return writer.toString();
//     }
// }
