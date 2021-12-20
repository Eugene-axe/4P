export const STRING_WITH_NUMBER_PLUS_STATUS = /( (-?\d*\d.\d\d\d)\s+(-?\d*\d.\d\d\d)\s+(-?\d*\d.\d\d\d)\s+(-?\d*\d.\d\d\d)\s+(-?\d*\d.\d\d\d)\s+(\w+|[а-я/*]+)\s+((НЕ.+ГОДЕН)||(ГОДЕН))*)|(Н*Е*\s+ГОДЕН)/i
export const NUMBER_STRING = /№(\s+)*\d+/g;
export const NUMBER_CLEAR = /\d+/g;
export const NAME_STRING = /( ')\s*.+\s*(' )/;
export const NAME_STRING_START = /[^']/g;

//for textArea in NavFooter
export const SPLITTERS_FOR_TEXTAREA_NAVFOOTER = /,|\.|\s/;
export const FIND_NUMBER = /^\d*$/;