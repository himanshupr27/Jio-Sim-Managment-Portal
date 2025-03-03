export const explainers=[
    {
        id:1,
        title:"JIo PKI:Mutual Authentication in Payment domain ",
        resourse:"Article",
        date: "May 15,2024",
        service: "Business Applications",
        image:"/Images/Explainer/article-1.1.jpg",
        content:<>
        <p>The traditional communication channel trusts only server’s identity. Most of the devices including a smart phone or PoS terminal in payment world use only server authentication. In contrast, <strong>Mutual authentication</strong> (Client authentication and Server authentication together) is gaining acceptance as a tool that can minimize the risk of online fraud in e-commerce. With <strong>mutual authentication</strong>, a connection can occur only when the client trusts the server's digital certificate and the server trusts the client's certificate which means, not only the user, but user’s devices are also authenticated before any communication.</p>
        <p>Mutual authentication on one hand provides better security than server authentication only but on the other hand, protecting private key in client devices is the key issue when implementing mutual authentication. PKI SIM would be extremely useful to mitigate this problem and provide a tamper resistant secure way to store private key required for mutual authentication.</p>
        <h2>Expected value addition</h2>
        <ol>
            <li>In ecommerce or financial domain, the PKI-SIM shall add the Digital signature and certificate property along with all the requirements of communication. The extra layer of security (client authentication) shall adhere a high degree of security and trust. </li>
            <li>The PKI SIM also shall be capable to provide End-to-End security at application layer which is not fully captured in traditional TLS/SSL which gives channel security at transport layer. For example, in current TLS/SSL, initiation of the secure channel is performed in plain text only. It invites vulnerabilities. With PKI SIM, even “client hello” the first message can also be signed (Change in TLS protocol). </li>
        </ol>
        <p>The need and use of mutual authentication has been referred and recommended by RBI through several guidelines from 2014 onward [1,2,3,4]. A representation of two-way SSL communication has been depicted in below figure.</p>
        <div className="image-container">
        <img src="/Images/Explainer/E-1.png"/>
        </div>
        </>
    },
    {
        id:2,
        title:"End to End Encryption (E2E)",
        service: "Business Applications",
        image:"/Images/Explainer/article-2.1.png",
        resourse:"Article",
        date: "May 15,2024",
        content:<>
        <p>In financial domain, various parameters are defined as sensitive data. Those parameters cannot be stored or transmitted in plain text over network. All symmetric key based encryption mechanisms are always having questionable security threat (as same key is used to encrypt and decrypt) in comparison of Asymmetric key based encryption or decryption. </p>
        <p>
        In financial domain, various parameters are defined as sensitive data. Those parameters cannot be stored or transmitted in plain text over network. All symmetric key based encryption mechanisms are always having questionable security threat (as same key is used to encrypt and decrypt) in comparison of Asymmetric key based encryption or decryption. 
        </p>
        <p>
        In the same context, apart from payment solution, the same vulnerability of E2E technique is equally valid for other communication environment such as messenger services, Cloud Services, Online Conferences, Email encryptions etc. 
        </p>
        <p>
        Expected value addition: PKI-SIM shall provide easy API based environment to get PKI or asymmetric cryptography (RSA/ECC) based end-to-end encryption which shall increase the security at the strongest level as per industry practices.
        </p>
        </>
    },
    {
        id:3,
        title:"Block Chain using PKI SIM",
        service: "Business Applications",
        image:"/Images/Explainer/article-3.jpg",
        resourse:"Article",
        date: "May 15,2024",
        content:<>
        <p>
        Block chain based Crypto currencies as well as other solutions like supply chain etc. are gaining popularity. Either it is a private block-chain, or publicly maintained ledger system, the mechanism to access it by users is almost similar. 
        </p>
        <p>
        Asymmetric cryptography is the fundamental component of any block chain-based solution. But the current user level hardware eco-system (smart phone or computer) is not fully equipped with PKI or asymmetric cryptography. The gap is managed by third party portal or proxy server which converts and maps each user by its unique asymmetric key pair which are stored and managed in third party system or server. Thus, it involves significant security risk. 
        </p>
        <p>The PKI-SIM shall enable each user to directly participate in any block-chain network without having security dependency (storing Asymmetric keys). </p>
        <p>
        The system architectures are depicted in below figures. 
        </p>
        <p>
        User (Third Party Server: Asymmetric key pair management) Username, password, OTP over TLS SSL/TLS Channel 
        </p>
        <div className="image-container">
        <img src="/Images/Explainer/E-3.1.png"/>
        </div>
        <div className="image-container">
        <img src="/Images/Explainer/E-3.2.png"/>
        </div>
        </>
    }
]