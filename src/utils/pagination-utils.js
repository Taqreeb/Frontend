import l from "lodash";

export const returnPaginationPage = (totalPage,page,limit,siblings)=>{
    let totalPageNoInArray = 7+siblings
    if(totalPageNoInArray>=totalPage){
      return l.range(1,totalPage+1);
    }
    let leftSiblingsIndex = Math.max(page-siblings,1)
    let rightSiblingsIndex = Math.min(page+siblings,totalPage)
  
    let showLeftDots = leftSiblingsIndex>2;
    let showRightDots = rightSiblingsIndex<totalPage-2;
  
    if(!showLeftDots && showRightDots){
      let leftItemsCount = 3+2*siblings;
      let leftRange = l.range(1, leftItemsCount+1);
      return [...leftRange, " ...", totalPage]
    }
    else if(showLeftDots && !showRightDots){
      let rightItemsCount = 3+2*siblings
      let rightRange = l.range(totalPage-rightItemsCount+1, totalPage +1);
      return [1, "... ", ...rightRange]
    }
    else{
      let middleRange = l.range(leftSiblingsIndex, rightSiblingsIndex+1);
      return [1,"... ", ...middleRange," ..." ,totalPage]
    }
  }