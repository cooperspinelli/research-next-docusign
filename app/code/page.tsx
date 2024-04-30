export default function CodePage() {
    return (
        <a href={`https://account-d.docusign.com/password?response_type=code&scope=signature%20impersonation&client_id=${process.env.INTEGRATION_KEY}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F`}>Grant access</a>
      );
}