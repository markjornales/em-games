import { TCardScratchProp } from "@/components/CanvasContext";

type TAPIHandlerPost = {
    qUid: string,
    dataParams: {
        card_id: number; 
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

export const authentications = async ({
    setAuthenticated, 
    setCardScratch, 
    setPlayed, 
    search,
    gid
  }: any) => {

    try {
      const response = await APIHandlerPost({ 
        qUid: search, 
        dataParams: {
          card_id: parseInt(gid), 
          category: null
      }}); 
      const scratchProps: TCardScratchProp = JSON.parse(response.scratch);  
      if(!gid){
        throw {
          message: "Unable to open this game please choose another game or try again click same game. thank you!",
          status: 401
        }
      }
      if(!response.ok && response.status_code == 0) { 
        if(response.status === 401) {
          throw {
            message: "Unauthorize Login, to access this feature, please log in to your account.",
          }
        } 
        if(response.status == 500) {
          throw {
            message: "Server is Busy, Please try again later.",
          }
        }
        if(response.status == 400) {
          throw {
            message: "System is down please try again later."
          }
        }
      }else {   
          setCardScratch(scratchProps);
          setPlayed(true);
          if(scratchProps.game_code == "100"){
            throw { message: scratchProps.message }
          }
      }
 
    } catch (error: any) {  
        setAuthenticated({
          authenticate: false, 
          message: error.message
        })   
    } 
  }