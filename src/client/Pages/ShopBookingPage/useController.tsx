import { useMenu, useShop } from "../../App";
import { PartySizeList } from "../../Components/PartySizeList";
import { useMutableState } from "../../utils/useMutableState";
import { PartySize } from "./PartySize";
import { MenuItem, Party } from "../../../types";

type Controller = {
  title: string;
  isCTAOpen: boolean;
  selectedMenu: MenuItem | undefined;
  partySize: PartySize;
  party: Party;
  isError: boolean;
  openCTA(): void;
  closeCTA(): void;
  setParty(val: number, action: string): void;
  selectMenu(value: MenuItem): void;
  completeBooking(): void;
  renderModal(): JSX.Element;
};

export function useController(): Controller {
  const shop = useShop();
  const menu = useMenu();
  const [state, setState] = useMutableState({
    isCTAOpen: false,
    party: {
      baby: 0,
      children: 0,
      adult: 1,
      senior: 0,
    },
    selectedMenu: menu && menu?.items?.length ? menu.items[0] : undefined,
    partySize: new PartySize(shop.config, menu.items),
    isError: false
  });

  const api: Controller = {
    ...state,
    title: `welcome to ${shop.config.slug}`,
    /**
     * should open the dialog box
     * @returns {void}
     */
    openCTA() {
      setState((d) => {
        d.isCTAOpen = true;
      });
    },
    /**
     * should close the dialog box
     * @returns {void}
     */
    closeCTA() {
      setState((d) => {
        d.isCTAOpen = false;
        d.isError = false;
      });
    },
    /**
     * should select from given menu items
     * @param {MenuItem} value
     * @returns {void}
     */
    selectMenu(value: MenuItem) {
      setState((d) => {
        d.selectedMenu = value;
        d.party = {
          ...d.party,
          baby: 0,
          children: 0,
          senior: 0,
        }
      })
    },
    /**
     * Should set party size
     * @param {number} val value to be set
     * @param {action} action party alias whose value to be set
     * @returns {void}
     */
    setParty(val: number, action: string) {
      setState((d) => {
        d.party = {
          ...d.party,
          [action]: val
        };
      });
    },
    /**
     * Complete the booking
     * @returns {void}
     */
    completeBooking () {
      let total = 0;
      for (let x in state.party) {
        total += state.party[x];
      }
      if (state?.selectedMenu?.isGroupOrder) {
        if (
          total > state.selectedMenu.maxOrderQty
          || 
          total < state.selectedMenu.minOrderQty 
          || 
          state.selectedMenu.maxOrderQty < state.selectedMenu.minOrderQty
          ||
          state.selectedMenu.minOrderQty === -Infinity
          ||
          state.selectedMenu.maxOrderQty === Infinity) {
          setState((d) => {
            d.isError = true
          })
        } else {
          if (state.isError) {
            setState((d) => {
              d.isError = false
            })
          }
          // save booking
        }
      } else {
        if (
          total > state.partySize.getMaxSize()
          ||
          total < state.partySize.getMinSize()
          ||
          state.partySize.getMaxSize() < state.partySize.getMinSize()
          ||
          state.partySize.getMinSize() === -Infinity
          ||
          state.partySize.getMaxSize() === Infinity
          ) {
          setState((d) => {
            d.isError = true
          })
        } else {
          if (state.isError) {
            setState((d) => {
              d.isError = false
            })
          }
          // save booking
        }
      }
    },
    renderModal() {
      return (
        <dialog open={state?.isCTAOpen} data-testid="Party Size Modal">
          <PartySizeList partySize={state?.partySize} setParty={api?.setParty} party={state?.party} selectMenu={api?.selectMenu} selectedMenu={state?.selectedMenu}/>
          {state?.isError && <p>Invalid selection</p>}
          <button onClick={api?.closeCTA}>close</button>
          <button onClick={api?.completeBooking}>book</button>
        </dialog>
      );
    },
  };

  return api;
}
