import { PartySize } from "../Pages/ShopBookingPage/PartySize";
import { MenuList } from "./MenuItems";
import { PartyAlias } from "./PartyAlias";
import { Party } from "../../types";
import { MenuItem } from "../../types";

type Props = {
  partySize: PartySize;
  setParty(val: number, action: string): void;
  party: Party;
  selectMenu(value: MenuItem): void;
  selectedMenu: MenuItem;
};

export const PartySizeList = ({ partySize, setParty, party, selectMenu, selectedMenu }: Props): JSX.Element => {
  return <div data-testid="Party Size List">
    {/* {partySize.getMenu().length ? <MenuList partySize={partySize} setParty={setParty} selectMenu={selectMenu} selectedMenu={selectedMenu}/> : null} */}
    {/* <label>Menu Context</label>:&nbsp; <label>{partySize.getMenu().length ? 'Enabled' : 'Disabled'}</label>  */}
    {
      Object.keys(party).map(alias => {
        switch (alias) {
          case 'senior':
            return partySize.shouldShowSenior() ? <PartyAlias key={alias} partySize={partySize} setParty={setParty} party={party} selectedMenu={selectedMenu} alias={alias}/> : null;
          case 'children':
            return partySize.shouldShowChild() ? <PartyAlias key={alias} partySize={partySize} setParty={setParty} party={party} selectedMenu={selectedMenu} alias={alias}/> : null;
          case 'baby':
            return partySize.shouldShowBaby() ? <PartyAlias key={alias} partySize={partySize} setParty={setParty} party={party} selectedMenu={selectedMenu} alias={alias}/> : null;
          default:
            return <PartyAlias key={alias} partySize={partySize} setParty={setParty} party={party} selectedMenu={selectedMenu} alias={alias}/>;
        }
      })
    }
  </div>;
};
