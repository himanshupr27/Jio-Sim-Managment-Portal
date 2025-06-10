export const LearnMoreData = [
    {
        id: 1,
        subtitle: "PKI SIM",
        icon: "1",
        title: "Two-way Secure Communication between SIM and Backend",
        date: "20th May,20025",
        image: "",
        sub_content:"PKI (Public Key Infrastructure) enables secure communication using encryption and digital certificates. SIM cards store unique subscriber identity and encryption keys, authenticating users on mobile networks and protecting data privacy.",
        content: <>

        </>,
    },
    {
        id: 2,
        subtitle: "Face Recognization",
        icon: "2",
        title: "Two-way Secure Communication between SIM and Backend",
        date: "20th May,20025",
        image: "",
        sub_content:"Face recognition technology analyzes facial features to identify or verify individuals. It is widely used for secure access, surveillance, and authentication due to its convenience, speed, and contactless nature.",
        content: <>

        </>,
    },
    {
        id: 3,
        subtitle: "Secure Communication",
        icon: "3",
        title: "Two-way Secure Communication between SIM and Backend",
        date: "20th May,20025",
        image: "/Images/LearnMore/Learn-secure.webp",
        sub_content:"Mobile communication now handles highly sensitive data, making it a prime target for cyber-attacks like OTP theft and SMS interception. ",
        content: <>
            <p>Mobile has become primary choice of device for accessing banking, financial, government and
                many other sensitive services & applications. This makes mobile phone a hot spot for
                attackers
            </p>
            <p> To understand these security threats and attack surface, first we need to understand how a
                typical mobile app works. In general, mobile apps make use of APIs for communication
                between App and blackened server where most of the business logic is implemented.</p>
            <p>Mobile app uses standard TLS/SSL transport layer security between mobile app and backend
                server for confidentiality as depicted in the figure above. In situations like banking & financial
                transactions and password reset, an OTP is also sent from backend (with the help of third
                party SMS service/MNOs) for user authentication. Although OTP is extensively used for
                authentication. APIs and OTP communicate over separate channels. However, there are
                many vulnerabilities in the entire communication chain inviting cyber attackers to exploit.

            </p>
            <p>For instance, the OS on which these mobile apps run can’t be trusted fully for sensitive
                operations and information storage. Data security at rest, in execution and in transit is to be
                ensured for secure operations. </p>
            <p>Although government has mandated the use of other factors of authentication to strengthen
                the security of banking and finance applications. However, the existing system of multi factor
                authentication are either conventional SMS based or app based which are not properly
                secured.</p>

            <div className="Pdf-button">
              <a
            href="/Files/Secure_communication.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-download-link"
          >
            <button>Learn More</button>
          </a>
            </div>
        </>,
    }
]