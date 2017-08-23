## Open-OTP-Server

A fast, secure, open-source NodeJS server for validating OTPs.

> This codebase is still in very stages of development, so I don't really recommend using it yet.

### Overview
This codebase is intended to provide an easy starting point for developing an OTP validation microservice.

For good security, it is best to not store OTP data in the same database as core user information, or to directly validate them with the same server that handles authentication and authorization.  Why? Seperation-of-concerns makes the security of each service much easier to test and verify, and helps to mitigate the chance of a complete security disaster if any of the services are individually breached.

This server provides an easy interface for storing and validating   compliant time-based one-time passwords (TOTPs).

How does it work?
When an OTP is created for a user, the OTP secret, along with a UID to identify the user, is submitted to this API from the server handling core authentication operations.  The server stores this data in Redis.  When a user is attempting to login, their UID and the submitted OTP are submitted to this API, and the Open-OTP-Server then loads the secret from Redis calculates the current TOPT value using the secret, and responds with information on whether the submitted OTP is correct.

> Note - This server is intended for use with Time-Based-One-Time-Passwords (RFC 6238), such as those used in Google Authenticator.  **SMS based OTPs are not secure**, due to their vulnerability to on-phone malware (do you know how many apps on your phone can monitor and read your text messages?), and well documented vulnerabilities in public mobile telephone networks.[^1]

[^1]: https://securityintelligence.com/whats-wrong-with-sms-authentication-two-ibm-experts-weigh-in-on-the-nist-recommendation/
