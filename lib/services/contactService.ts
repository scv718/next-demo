export async function sendContactMessage(req: ContactMessageReq): Promise<FormState> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.SEND_CONTACT_MESSAGE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    });

    if (!res.ok) {
      //api 에러 처리
      return {
        success: false,
        error: `[HTTP STATUS] ${res.status}: ${res.statusText}`
      };
    }

    await res.json();
  } catch (e) {
    //fetch 에러 처리
    return {
      success: false,
      error: '네트워크에 이상이 있습니다.'
    };
  }

  return {
    success: true
  };
}
