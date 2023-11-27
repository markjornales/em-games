import { TCardScratchProp } from "@/components/CanvasContext";
import ThrowException from "./ThrowException";

type TAPIHandlerPost = {
    baseUrl: string;
    qUid: string,
    dataParams: {
        card_id: number; 
        category: any;
    }
}
export default async function APIHandlerPost(props: TAPIHandlerPost) {
    const { qUid, dataParams, baseUrl } = props; 
    try {
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
      const baseUrl = process.env.NEXT_PUBLIC_SCRATCH_STORE!;
      const response = await APIHandlerPost({ 
        baseUrl,
        qUid: search, 
        dataParams: {
          card_id: parseInt(gid), 
          category: null
      }}); 
      const errorHandler = new ThrowException();
      if(!response.ok && response.status_code == 0) { 
        errorHandler.handleError(response.status);
      } else if(!gid){
        errorHandler.handleError(422);
      } else {   
          const scratchProps: TCardScratchProp = JSON.parse(response.scratch); 
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

  export const afterScratchAuth = async ({
    setAuthenticated, 
    setCardScratch, 
    setPlayed, 
    search,
    gid
  }: any) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SCRATCH_SUCCESS!;
      const response = await APIHandlerPost({ 
        baseUrl,
        qUid: search, 
        dataParams: {
          card_id: parseInt(gid), 
          category: null
      }}); 
      const errorHandler = new ThrowException();
      if(!response.ok && response.status_code == 0) {
        errorHandler.handleError(response.status);
      } 
      else {   
          const {e_wallet}: TCardScratchProp = JSON.parse(response.scratch);    
          setCardScratch((init: TCardScratchProp) => Object.assign(init, { e_wallet }));
          setPlayed(true); 
      } 
    } catch (error: any) {
       setAuthenticated({
          authenticate: false, 
          message: error.message
        });   
    }
  }