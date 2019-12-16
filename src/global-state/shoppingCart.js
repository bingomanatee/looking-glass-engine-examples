import {ValueStream} from '@wonderlandlabs/looking-glass-engine';
import TeddyBear from '../img/TeddyBear';
import Train from '../img/TommyTrain';
import AK47 from '../img/AK47';

const shoppingCart = new ValueStream('cart');
shoppingCart
.addProp('purchases', [], 'array')
.addProp('currentProduct')
.addAction('addPurchase', (store, purchase) => {
  if (purchase) {
  store.do.setPurchases([...store.my.purchases, purchase])
  }
  store.do.setCurrentProduct(false);
})
.addProp('products', [
  {
    name:'Jeremy the Teddy Bear',
    cost: 200,
    Image: TeddyBear
  },
  {
    name:'Thomas the Train', 
    cost: 100,
    Image: Train
  },
  {
    name: 'Alan the AK-47',
    cost: 75,
    Image: AK47
  }
], 'array');

export default shoppingCart;