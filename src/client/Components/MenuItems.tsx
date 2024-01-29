import { PartySize } from "../Pages/ShopBookingPage/PartySize";
import { MenuItem } from "../../types";

type Props = {
  selectMenu(value: MenuItem): void;
  selectedMenu: MenuItem;
  partySize: PartySize;
  setParty(val: number, action: string): void;
};

export const MenuList = ({ partySize, selectMenu, selectedMenu, setParty }: Props): JSX.Element => {
  return <div>
      Menu
      <select data-testid="Party Menu List Counter" value={selectedMenu?.id || selectMenu[0]?.id} onChange={(event) => {
        const menuItem = partySize.getMenu().find(val => String(val.id) === String(event.target.value));
        setParty(menuItem.minOrderQty, 'adult');
        selectMenu(menuItem);
      }}>
        {partySize.getMenu().map(option => {
          return <option key={option.id} value={option.id}>{option.title}</option>
        })}
      </select>
  </div>;
};
