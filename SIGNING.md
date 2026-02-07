# Optional profile signing (US-012)

iOS shows **Verified** when a configuration profile is signed with a valid certificate; unsigned profiles install but show **Not Verified**.

## Option 1: Apple Developer certificate

- Use a certificate from your [Apple Developer](https://developer.apple.com) account (e.g. **Developer ID Application** or a certificate that supports code signing).
- Export the certificate and private key as PEM (e.g. `signing.pem` and `signing-key.pem`).

## Option 2: Third-party / enterprise certificates

- Any certificate that iOS trusts in the chain can be used; enterprise or internal CA-issued certs may need to be installed on the device first.
- Format: PEM for both certificate and private key.

## Integration (mobileconfig package)

The app uses the [mobileconfig](https://github.com/zone-eu/mobileconfig) (zone-eu) npm package for optional signing.

To enable signing:

1. Set environment variables (or use a secure secret store in production):
   - `SIGNING_CERT` — PEM-encoded certificate (string or path).
   - `SIGNING_KEY` — PEM-encoded private key (string or path).

2. The publish API can be extended to call `mobileconfig.getSignedConfig(plistData, keys, callback)` when these are set, and return signed XML instead of unsigned.

3. Unsigned profiles continue to work; signing is optional.

## References

- [Apple: Configuration Profile Reference](https://developer.apple.com/library/content/featuredarticles/iPhoneConfigurationProfileRef/Introduction/Introduction.html)
- [mobileconfig on npm](https://www.npmjs.com/package/mobileconfig)
