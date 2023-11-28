export const popupWinnerHandle200 = (combi: string): number => {
    const listwinners = [0, 1, 2, 3, 4, 5, 7, 8, 8, 17];
    const combiNumber = combi.replace(/[^1]/g, "").length;
    return listwinners[combiNumber];
  }