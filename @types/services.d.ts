interface BackendAuthResponse {
  data: {
    member: {
      id: string;
      name: string;
      email: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

interface ContactMessageReq {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  phoneNumber: string;
}

interface FormState {
  success?: boolean;
  valid?: Record<string, string>;
  error?: string;
}
