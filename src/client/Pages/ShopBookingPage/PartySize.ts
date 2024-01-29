import { MenuItem, Shop } from "../../../types";

export class PartySize {
  private shop: Shop;

  private menu: MenuItem[];

  constructor(shop: Shop, menu: MenuItem[]) {
    this.shop = shop;
    this.menu = menu;
  }

  /**
   * Get minimum party size
   * @returns {number}
   */
  getMinSize(): number {
    let minSize = this.shop.maxNumPeople || 1
    if (this.menu.length) {
      for (const menuItem of this.menu) {
        if (menuItem.isGroupOrder && menuItem.minOrderQty) {
          minSize = menuItem.minOrderQty
        }
      }
    }
    return minSize;
  }

  /**
   * Get maximum party size
   * @returns {number}
   */
  getMaxSize(): number {
    let maxSize = this.shop.maxNumPeople || 10
    if (this.menu.length) {
      for (const menuItem of this.menu) {
        if (menuItem.isGroupOrder && menuItem.maxOrderQty) {
          maxSize = menuItem.maxOrderQty
        }
      }
    }
    return maxSize;
  }

  /**
   * Should show baby for setting party
   * @returns {boolean}
   */
  shouldShowBaby(): boolean {
    return this.shop.showBaby;
  }

  /**
   * Should show children for setting party
   * @returns {bool}
   */
  shouldShowChild(): boolean {
    return this.shop.showChild;
  }

  /**
   * Should show senior for setting party
   * @returns {boolean}
   */
  shouldShowSenior(): boolean {
    return this.shop.showSenior;
  }

  /**
   * Get menu items
   * @returns {MenuItem[]}
   */
  getMenu(): MenuItem[] {
    return this.menu;
  }
 
}
