// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {formatNumber} from 'react-native-currency-input';
import {TextInput} from 'react-native-gesture-handler';
import {color} from '../../constant/theme';
import {IServ} from '../../model/Serv';
import {PartDetail} from '../../screens/interface';
import AddProduct from './AddProduct';

export interface IProduct {
  s: IServ[];
  p: PartDetail[];
}
interface ProductsProps {
  getProducts: (p: IProduct) => void;
  parts: PartDetail[];
  servs: IServ[];
  product?: IProduct;
}

const Products: FC<ProductsProps> = ({getProducts, parts, servs, product}) => {
  const partsRef = useRef<PartDetail[]>([]);
  const [products, setProducts] = useState<{s: IServ[]; p: PartDetail[]}>({
    s: [],
    p: [],
  });
  const [visibleProduct, setVisibleProduct] = useState(false);
  const productMemo = useMemo(() => product, [product]);

  useEffect(() => {
    productMemo && setProducts(productMemo);
  }, [productMemo]);

  useEffect(() => {
    partsRef.current = parts;
  }, [parts]);

  const openAddProduct = useCallback(() => {
    setVisibleProduct(true);
  }, []);
  const closeAddProduct = useCallback(() => {
    setVisibleProduct(false);
  }, []);

  const handleOnAddProduct = useCallback(
    (servId: string, partId: string, productType) => {
      const _products = {...products};
      const _partsRef = [...partsRef.current];
      if (productType === '1' && servId) {
        const serv = servs.filter(s => s.id === servId);
        serv.length && _products.s.push(serv[0]);
        setProducts(_products);
        getProducts(_products);
        closeAddProduct();
        return true;
      }
      if (productType === '2' && partId) {
        const part = _partsRef.filter(s => s.id === partId);
        const _parts = _partsRef.filter(s => s.id !== partId);
        if (part.length) {
          const _part = {...part[0], quantity: 1};
          _products.p.push(_part);
          partsRef.current = _parts;
        }
        setProducts(_products);
        getProducts(_products);
        closeAddProduct();
        return true;
      }
      return false;
    },
    [closeAddProduct, getProducts, products, servs],
  );

  const handleDeleteServProduct = useCallback(
    (id: string) => {
      const _products = {...products};
      const s = _products.s.filter(x => x.id !== id);
      setProducts({..._products, s});
      getProducts({..._products, s});
    },
    [getProducts, products],
  );

  const handleDeletePartProduct = useCallback(
    (id: string) => {
      const _products = {...products};
      const _parts = [...partsRef.current];

      const p = _products.p.filter(x => x.id !== id);
      const part = _products.p.filter(x => x.id === id);
      if (part.length) {
        _parts.push(part[0]);
        setProducts({..._products, p});
        getProducts({..._products, p});
        partsRef.current = _parts;
      }
    },
    [getProducts, products],
  );

  const handleOnChangeQty = useCallback(
    (text: string, id: string) => {
      const _products = {...products};
      const part = _products.p.filter(s => s.id === id);
      if (part.length) {
        const index = _products.p.indexOf(part[0]);
        _products.p[index] = {...part[0], quantity: parseInt(text, 10) || 0};
        setProducts(_products);
        getProducts(_products);
      }
    },
    [getProducts, products],
  );

  return (
    <View>
      <TouchableOpacity style={styles.btnAddProduct} onPress={openAddProduct}>
        <Text style={styles.textBtnProduct}>Tambah Produk</Text>
      </TouchableOpacity>
      <View style={styles.productContent}>
        <View style={styles.subProductContent}>
          <Text style={styles.textProduct}>Estimasi Jasa</Text>
          {products.s.map(s => (
            <View key={s.id}>
              <View style={styles.detailContent}>
                <Text style={styles.textProductTitle}>{s.name}</Text>
                <Text style={styles.textProductPrice}>
                  {formatNumber(s.price, {
                    prefix: 'Rp',
                    delimiter: ',',
                    signPosition: 'beforePrefix',
                  })}
                </Text>
                <TouchableOpacity
                  style={styles.btnDeleteService}
                  onPress={() => handleDeleteServProduct(s.id!)}>
                  <Text style={styles.textDeleteService}>Hapus</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <Text style={styles.textAmount}>
            {formatNumber(
              products.s.reduce((a, b) => a + b.price, 0),
              {
                prefix: 'Rp',
                delimiter: ',',
                signPosition: 'beforePrefix',
              },
            )}
          </Text>
        </View>

        <View style={styles.subProductContent}>
          <Text style={styles.textProduct}>Estimasi Sparepart</Text>
          {products.p.map(x => (
            <View style={styles.detailContent} key={x.id}>
              <View>
                <Text style={styles.textProductTitle}>{x.name}</Text>
                <Text style={styles.textProductTitle}>{x.code}</Text>
              </View>
              <Text style={styles.textProductPrice}>
                {formatNumber(x.price, {
                  prefix: 'Rp',
                  delimiter: ',',
                  signPosition: 'beforePrefix',
                })}
              </Text>
              <Text style={styles.textProductPrice}>X</Text>
              <TextInput
                style={styles.inputPartQty}
                maxLength={2}
                keyboardType="number-pad"
                value={x.quantity.toString()}
                onBlur={() => {
                  if (x.quantity < 1) {
                    handleOnChangeQty('1', x.id!);
                  }
                }}
                onChangeText={text => handleOnChangeQty(text, x.id!)}
              />
              <TouchableOpacity
                style={styles.btnDeleteService}
                onPress={() => handleDeletePartProduct(x.id!)}>
                <Text style={styles.textDeleteService}>Hapus</Text>
              </TouchableOpacity>
            </View>
          ))}

          <Text style={styles.textAmount}>
            {formatNumber(
              products.p.reduce((a, b) => a + b.price * b.quantity, 0),
              {
                prefix: 'Rp',
                delimiter: ',',
                signPosition: 'beforePrefix',
              },
            )}
          </Text>
        </View>
        <View style={styles.subProductContent}>
          <Text style={styles.textProduct}>Estimasi Waktu Pengerjaan</Text>

          <Text style={styles.textProductTitle}>
            {products.s.reduce((a, b) => a + b.processTime, 0)} Menit
          </Text>
        </View>
        <View style={styles.totalContent}>
          <Text style={styles.textTotal}>Total</Text>
          <Text style={styles.textTotal}>
            {formatNumber(
              products.s.reduce((a, b) => a + b.price, 0) +
                products.p.reduce((a, b) => a + b.price * b.quantity, 0),
              {
                prefix: 'Rp',
                delimiter: ',',
                signPosition: 'beforePrefix',
              },
            )}
          </Text>
        </View>
      </View>
      <AddProduct
        onAdd={handleOnAddProduct}
        onClose={closeAddProduct}
        visible={visibleProduct}
        parts={partsRef.current}
        servs={servs}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  btnAddProduct: {
    borderColor: color.lightPurple,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  productContent: {marginBottom: 10},
  subProductContent: {marginVertical: 10},
  textBtnProduct: {color: color.lightPurple},
  detailContent: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  textProductTitle: {color: color.darkGray, minWidth: '40%'},
  textProductPrice: {color: color.yellow, marginEnd: 10},
  btnDeleteService: {
    borderColor: color.lightPurple,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
  },
  inputPartQty: {
    padding: -10,
    color: color.darkGray,
    borderBottomWidth: 1,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  textDeleteService: {
    color: color.lightPurple,
    fontSize: 10,
    paddingHorizontal: 3,
  },
  textProduct: {
    color: color.lightPurple,
    borderBottomColor: color.gray,
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5,
  },
  textAmount: {
    color: color.lightPurple,
    textAlign: 'center',
    borderTopColor: color.gray,
    borderBottomColor: color.gray,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 3,
  },
  totalContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTotal: {
    color: color.darkGray,
    fontSize: 16,
  },
  addProductContent: {marginVertical: 10},
});
