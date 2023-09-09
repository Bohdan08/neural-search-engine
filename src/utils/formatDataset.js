import { Stripe, Gmail, Alexa } from "../dataset";
import { SiAmazonalexa, SiGmail, SiStrapi } from "react-icons/si";

const ICON_MAPPING = {
  Gmail: <SiGmail size={20} />,
  Stripe: <SiStrapi size={20} />,
  Alexa: <SiAmazonalexa size={20} />,
};

// type -> Stripe | Gmail | Alexa -> string values
// dataset -> Stripe | Gmail | Alexa -> ['sometxt1', 'sometext2']
// ticketArray -> the final array -> [{type: 'Gmail', text: 'someText1'}]

const convertDataSetByType = (type, dataset, ticketArray) => {
  if (dataset?.length) {
    dataset.forEach((text) => {
      ticketArray.push({ icon: ICON_MAPPING[type], type, text });
    });
  }
};

const formatDataset = () => {
  let ticketArray = [];
  // [{type: 'Gmail', text: 'someText1'}]

  convertDataSetByType("Stripe", Stripe, ticketArray);
  convertDataSetByType("Gmail", Gmail, ticketArray);
  convertDataSetByType("Alexa", Alexa, ticketArray);

  return ticketArray;
};

export default formatDataset;
