import {filter,isEmpty} from 'lodash';

const defaultPageSize = 12;

export function appendItems({allItems, viewItems = [], pageSize = defaultPageSize}) {
  if (!isEmpty(allItems) || allItems.length === viewItems.length){
    const startIndex = viewItems.length;
    const newItems = allItems.slice(startIndex, (startIndex + pageSize));
    for(let skin of newItems){
      viewItems.push(skin);
    }
    return viewItems;
  }
}


