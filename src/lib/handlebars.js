import { format } from "timeago.js";
const ayuda = {};
ayuda.timeago = (timestamp) =>{
    return format(timestamp);
}
export default ayuda;