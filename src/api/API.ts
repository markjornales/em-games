
type TAPIHandlerPost = {
    qUid: string,
    dataParams: {
        card_id: number;
        user_id: number;
        category: any;
    }
}
export default async function APIHandlerPost(props: TAPIHandlerPost) {
    const { qUid, dataParams } = props; 
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SCRATCH_STORE!;
        const response = await fetch(baseUrl, {
            method: "post", 
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json", 
                "Authorization": `Bearer ${qUid}`
            }, 
            body: JSON.stringify(dataParams)
        });
        if(!response.ok) {
            return {
                status: response.status,
                ok: response.ok,
                status_code: 0,
            }
        }
        return response.json();
    } catch (error) {
        return error;
    }
}
