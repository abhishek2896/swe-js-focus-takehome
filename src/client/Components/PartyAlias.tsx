import { PartySize } from "../Pages/ShopBookingPage/PartySize";
import { MenuItem, Party } from "../../types";

type Props = {
  partySize: PartySize;
  setParty(val: number, action: string): void;
  party: Party;
  selectedMenu: MenuItem;
  alias: string;
};

const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => {
  return {
    label: val,
    value: val,
  }
})

export const PartyAlias = ({ partySize, setParty, party, selectedMenu, alias }: Props): JSX.Element => {

  /**
   * Valid data test ids
   * @returns {string}
   */
  const getTestIds = () => {
    switch (alias) {
      case 'adult':
        return 'Party Size List Adults Counter';
      case 'children':
        return 'Party Size List Children Counter';
      case 'baby':
        return 'Party Size List Babies Counter';
      default:
        return 'Party Size List Seniors Counter';
    }
  }

  /**
   * Labels for the Party
   * @returns {string}
   */
  const getLabels = () => {
    switch (alias) {
      case 'adult':
        return 'Adult';
      case 'children':
        return 'Children';
      case 'baby':
        return 'Babies';
      default:
        return 'Senior';
    }
  }

  /**
   * Should the Subtract button be disabled
   * @returns {boolean}
   */
  const shouldSubtractDisable = (): boolean => {
    switch (alias) {
      case 'adult':
        return party.adult === 0 || (party.adult === 1 && party.baby === 0 && party.children === 0 && party.senior === 0);
      case 'children':
        return party.children === 0 || (party.adult === 0 && party.baby === 0 && party.children === 1 && party.senior === 0);
      case 'baby':
        return party.baby === 0 || (party.adult === 0 && party.baby === 1 && party.children === 0 && party.senior === 0);
      default:
        return party.senior === 0 || (party.adult === 0 && party.baby === 0 && party.children === 0 && party.senior === 1);
    }
  }

  /**
   * Should the Add button be disabled
   * @returns {boolean}
   */
  const shouldAddDisable = (): boolean => {
    const menu = partySize.getMenu()
    switch (alias) {
      // babies should never be alone
      case 'baby':
        return (party.adult === 0 && party.senior === 0 && party.children === 0) || 
            (party.baby + party.children + party.adult + party.senior >= partySize.getMaxSize()
        );
      default:
        return party.baby + party.children + party.adult + party.senior >= partySize.getMaxSize()
    }
  }

  
  return <div data-testid={getTestIds()}>
      <label>{getLabels()}</label>
      <select value={party[alias]} onChange={(event) => setParty(Number(event.target.value), alias)}>
        {options.map(option => {
          return <option key={option.value} value={option.value}>{option.label}</option>
        })}
      </select>
      <button data-testid="Counter Subtract Button" disabled={shouldSubtractDisable()} onClick={() => setParty(party[alias]-1, alias)}>Substract</button>
      <button data-testid="Counter Add Button" disabled={shouldAddDisable()} onClick={() => setParty(party[alias]+1, alias)}>Add</button>
  </div>;
};
