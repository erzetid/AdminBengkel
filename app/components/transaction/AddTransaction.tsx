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
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {formatNumber} from 'react-native-currency-input';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {TransactionStatus, TransactionType} from '../../constant/enum';
import {color} from '../../constant/theme';
import LocalDB from '../../database';
import {ICustomer} from '../../model/Customer';
import {IServ} from '../../model/Serv';
import {ITransaction} from '../../model/Transaction';
import {IVehicle} from '../../model/Vehicle';
import {PartDetail} from '../../screens/interface';
import Form from '../form/Form';
import {IProduct} from '../serv/Products';

export const toRupiah = (num: number) => {
  return formatNumber(num, {
    prefix: 'Rp',
    delimiter: ',',
    signPosition: 'beforePrefix',
  });
};

const partsItemAdapter = (p: PartDetail[]) => {
  const result = p.map(x => {
    const label = `${x.name} ${x.code} - ${toRupiah(x.price)}(stok: ${
      x.quantity
    })`;
    const value = x.id!;

    return {label, value};
  });

  return result;
};

const servsItemAdapter = (s: IServ[]) => {
  const result = s.map(x => {
    const label = `${x.name} - ${toRupiah(x.price)})`;
    const value = x.id!;

    return {label, value};
  });

  return result;
};

interface IDropdown {
  label: string;
  value: TransactionType | string;
}
interface AddTransactionProps {
  visible: boolean;
  title: string;
  type?: TransactionType;
  products?: IProduct;
  isClear?: boolean;
  onClose: () => void;
  onAlert: (message: string) => void;
  onAdd: (tx: ITransaction) => void;
}

const AddTransaction: FC<AddTransactionProps> = ({
  visible,
  title,
  products,
  type,
  isClear,
  onClose,
  onAlert,
  onAdd,
}) => {
  const partsCollection = useMemo(() => LocalDB.parts, []);
  const servsCollection = useMemo(() => LocalDB.servs, []);
  const customersCollection = useMemo(() => LocalDB.customers, []);
  const vehiclesCollection = useMemo(() => LocalDB.vehicles, []);
  const partsRef = useRef<PartDetail[]>([]);
  const servsRef = useRef<IServ[]>([]);
  const customers = useRef<ICustomer[]>([]);
  const vehicles = useRef<IVehicle[]>([]);
  const defaultCustomer: ICustomer = useMemo(() => {
    return {
      address: 'Alamat',
      name: 'Tidak ada nama',
      no: '00000000000000',
      phone: '0000000',
      id: '0',
    };
  }, []);
  const defaultVehicle: IVehicle = useMemo(() => {
    return {
      brand: 'Brand',
      model: 'Model',
      plate: 'H1796SEP',
      registrationNumber: 'REG1302',
      year: 2012,
      id: '0',
    };
  }, []);

  const [openTxType, setOpenTxType] = useState(false);
  const [valueTxType, setValueTxType] = useState<TransactionType | string>('');
  const [txTypeItems, setTxTypeItems] = useState<IDropdown[]>([
    {label: 'SERVIS', value: TransactionType.SERVICE},
    {label: 'SPAREPART', value: TransactionType.PART},
  ]);

  const [openParts, setOpenParts] = useState(false);
  const [valueParts, setValueParts] = useState('');
  const [partsItems, setPartsItems] = useState<IDropdown[]>([]);

  const [openServs, setOpenServs] = useState(false);
  const [valueServs, setValueServs] = useState('');
  const [servsItems, setServsItems] = useState<IDropdown[]>([]);

  const [valueProducts, setValueProducts] = useState<IProduct>({p: [], s: []});
  const [withoutData, setWithoutData] = useState(true);
  const [withoutDataValue, setWithoutDataValue] = useState({
    name: '',
    phone: '',
    plate: '',
  });
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [openCustomer, setOpenCustomer] = useState(false);
  const [valueCustomer, setValueCustomer] = useState('');
  const [customerItems, setCustomerItems] = useState<IDropdown[]>([]);

  const [openVehicle, setOpenVehicle] = useState(false);
  const [valueVehicle, setValueVehicle] = useState('');
  const [vehicleItems, setVehicleItems] = useState<IDropdown[]>([]);
  const [paymentValue, setPaymentValue] = useState({
    amount: '0',
    discount: '0',
  });
  const [amountValue, setAmountValue] = useState({
    amountDiscount: 0,
    amountTotal: 0,
  });

  const [transaction, setTransaction] = useState<ITransaction>();

  useEffect(() => {
    const init = async () => {
      partsRef.current = await partsCollection.getAll();
      servsRef.current = await servsCollection.getAll();
      customers.current = await customersCollection.getAll();
      vehicles.current = await vehiclesCollection.getAll();
      setServsItems(servsItemAdapter(servsRef.current));
      setCustomerItems(
        customers.current.map(c => {
          const label = `${c.name} (+62${c.phone})`;
          const value = c.id!;
          return {label, value};
        }),
      );
    };
    init();
  }, [
    customersCollection,
    partsCollection,
    servsCollection,
    vehiclesCollection,
  ]);

  useEffect(() => {
    if (isClear) {
      setValueTxType('');
      setValueCustomer('');
      setValueParts('');
      setValueCustomer('');
      setValueServs('');
      setAmountValue({
        amountDiscount: 0,
        amountTotal: 0,
      });
      setPaymentValue({
        amount: '0',
        discount: '0',
      });
      setTransaction(undefined);
      setValueProducts({s: [], p: []});
    }
  }, [isClear]);

  useEffect(() => {
    type && setValueTxType(type);
  }, [type]);

  useEffect(() => {
    products && setValueProducts(products);
  }, [products]);

  useEffect(() => {
    const _vehicles = [...vehicles.current];
    setVehicleItems(
      _vehicles
        .filter(v => v.owner === valueCustomer)
        .map(v => {
          return {label: `${v.plate} - ${v.brand} ${v.model}`, value: v.id!};
        }),
    );
  }, [valueCustomer]);
  useEffect(() => {
    const valid = async () => {
      await handleOnChangePayValue();
    };
    valid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentValue, valueTxType, valueProducts]);

  const getDataOnServs = useCallback(async (): Promise<ICustomer> => {
    let _customer: ICustomer = {...defaultCustomer};
    let _vehicle: IVehicle = {...defaultVehicle};
    if (withoutData) {
      if (withoutDataValue.name) {
        _customer = {..._customer, name: withoutDataValue.name};
      }
      if (withoutDataValue.phone) {
        _customer = {..._customer, phone: withoutDataValue.phone};
      }
      if (withoutDataValue.plate) {
        _vehicle = {..._vehicle, plate: withoutDataValue.plate};
      }
    } else {
      try {
        const c = await customersCollection.findById(valueCustomer);
        const v = await vehiclesCollection.findById(valueVehicle);
        _customer = {...c.data!, id: valueCustomer};
        _vehicle = {...v.data!, id: valueVehicle};
      } catch (error) {}
    }

    const customer: ICustomer = {..._customer, vehicle: [_vehicle]};

    return customer;
  }, [
    customersCollection,
    defaultCustomer,
    defaultVehicle,
    valueCustomer,
    valueVehicle,
    vehiclesCollection,
    withoutData,
    withoutDataValue.name,
    withoutDataValue.phone,
    withoutDataValue.plate,
  ]);
  const getDataOnParts = useCallback(async (): Promise<ICustomer> => {
    let _customer: ICustomer = {...defaultCustomer};
    if (withoutData) {
      if (withoutDataValue.name) {
        _customer = {..._customer, name: withoutDataValue.name};
      }
      if (withoutDataValue.phone) {
        _customer = {..._customer, phone: withoutDataValue.phone};
      }
    } else {
      try {
        const c = await customersCollection.findById(valueCustomer);
        _customer = {...c.data!, id: valueCustomer};
      } catch (error) {}
    }

    return {..._customer, vehicle: []};
  }, [
    customersCollection,
    defaultCustomer,
    valueCustomer,
    withoutData,
    withoutDataValue.name,
    withoutDataValue.phone,
  ]);
  const handleOnChangePayValue = useCallback(async () => {
    const time = Date.now();
    const no = `TX${time}`;
    const _products = {...valueProducts};
    const status = TransactionStatus.PAID;
    const tax = 0;
    const _type = valueTxType as TransactionType;
    const discount = parseInt(paymentValue.discount || '0', 10);
    const totalServ = valueProducts.s.reduce((a, b) => a + b.price, 0);
    const totalPart = valueProducts.p.reduce(
      (a, b) => a + b.price * b.quantity,
      0,
    );
    const amount = totalServ + totalPart;
    const amountDiscount = (amount * discount) / 100;
    const amountTax = 0;
    const finalAmount = amount - amountDiscount;
    const _buffer = {
      time,
      no,
      status,
      products: _products,
      tax,
      type: _type,
      amount,
      discount,
      amountTax,
      totalServ,
      totalPart,
      amountDiscount,
      finalAmount,
    };
    const _amountValue = {
      ...amountValue,
    };
    setAmountValue({
      ..._amountValue,
      amountDiscount,
      amountTotal: finalAmount,
    });
    if (valueTxType) {
      if (valueTxType === TransactionType.PART) {
        const _data = await getDataOnParts();
        if (_data.name !== 'Tidak ada nama' && _data.id) {
          const _txBuffer: ITransaction = {
            ..._buffer,
            customer: _data,
          };
          setTransaction(_txBuffer);
        }
      } else {
        const _data = await getDataOnServs();
        if (
          _data.name !== 'Tidak ada nama' &&
          _data.id &&
          _data.vehicle?.length &&
          _data.vehicle[0].id
        ) {
          const _txBuffer: ITransaction = {
            ..._buffer,
            customer: _data,
          };
          setTransaction(_txBuffer);
        }
      }
    }
  }, [
    amountValue,
    getDataOnParts,
    getDataOnServs,
    paymentValue.discount,
    valueProducts,
    valueTxType,
  ]);

  const handleOnOpenPart = useCallback(() => {
    const allParts = [...partsRef.current];
    const selectedParts = [...valueProducts.p];
    let _parts: PartDetail[] = allParts;
    if (selectedParts.length) {
      _parts = allParts.filter(
        all => selectedParts.findIndex(i => i.id === all.id) < 0,
      );
    }
    const adapter = partsItemAdapter([..._parts]);

    setPartsItems(adapter);
  }, [valueProducts.p]);

  const handleOnOpenServ = useCallback(() => {
    const allServs = [...servsRef.current];
    const selectedServs = [...valueProducts.s];
    let _servs: IServ[] = allServs;
    if (selectedServs.length) {
      _servs = allServs.filter(
        all => selectedServs.findIndex(i => i.id === all.id) < 0,
      );
    }
    const adapter = servsItemAdapter([..._servs]);

    setServsItems(adapter);
  }, [valueProducts.s]);

  const handleOnChangePart = (id: string | null) => {
    const _partsRef = [...partsRef.current];
    const selectedPart = _partsRef.filter(x => x.id === id);
    const _tx = {...valueProducts};
    selectedPart.length && _tx.p.push({...selectedPart[0], quantity: 1});
    setValueProducts(_tx);
    setValueParts('');
  };
  const handleOnChangeServ = (id: string | null) => {
    const _servsRef = [...servsRef.current];
    const selectedServ = _servsRef.filter(x => x.id === id);
    const _tx = {...valueProducts};
    selectedServ.length && _tx.s.push(selectedServ[0]);
    setValueProducts(_tx);
    setValueServs('');
  };

  const handleOnChangeQty = (text: string, id: string) => {
    let qty = parseInt(text, 10);
    const _products = {...valueProducts};
    const _partsRef = [...partsRef.current];
    const changedPart = _partsRef.filter(x => x.id === id);
    const part = _products.p.filter(s => s.id === id);

    if (part.length) {
      if (changedPart.length && qty > changedPart[0].quantity) {
        onAlert(
          `Stok ${changedPart[0].name} hanya tersedia: ${changedPart[0].quantity}`,
        );
        qty = 0;
      }
      const index = _products.p.indexOf(part[0]);
      _products.p[index] = {...part[0], quantity: qty || 0};
      setValueProducts(_products);
    }
  };

  const handleDeletePartProduct = (id: string) => {
    const _products = {...valueProducts};
    const cancelSelectedPart = _products.p.filter(x => x.id !== id);
    _products.p = cancelSelectedPart;

    setValueProducts(_products);
  };
  const handleDeleteServProduct = (id: string) => {
    const _products = {...valueProducts};
    const cancelSelectedServ = _products.s.filter(x => x.id !== id);
    _products.s = cancelSelectedServ;

    setValueProducts(_products);
  };

  const handleOnPayment = () => {
    transaction && onAdd(transaction);
  };

  const onChangeTextCustomer = (
    text: string,
    field: keyof typeof withoutDataValue,
  ) => {
    const _withoutDataValue = {...withoutDataValue};
    setWithoutDataValue({..._withoutDataValue, [field]: text});
  };

  const onChangePayment = (text: string, field: keyof typeof paymentValue) => {
    const _paymentValue = {...paymentValue};
    setPaymentValue({..._paymentValue, [field]: text});
  };
  const partDropDown = () => (
    <View>
      <DropDownPicker
        open={openParts}
        value={valueParts}
        items={partsItems}
        setOpen={setOpenParts}
        setValue={setValueParts}
        setItems={setPartsItems}
        onOpen={handleOnOpenPart}
        onChangeValue={v => handleOnChangePart(v)}
        placeholder={'Tambah Sparepart'}
        style={styles.dropdown}
        labelStyle={styles.label}
        placeholderStyle={styles.placeholder}
        listMode="MODAL"
        translation={{
          NOTHING_TO_SHOW: 'Sparepart sudah digunakan/masih kosong!',
          SEARCH_PLACEHOLDER: 'Ketikan kode/nama part',
        }}
        listMessageTextStyle={{color: color.black}}
        mode="SIMPLE"
        searchable={true}
      />
    </View>
  );
  const servDropDown = () => (
    <View>
      <DropDownPicker
        open={openServs}
        value={valueServs}
        items={servsItems}
        setOpen={setOpenServs}
        setValue={setValueServs}
        setItems={setServsItems}
        placeholder={'Tambah Jasa Servis'}
        onChangeValue={v => handleOnChangeServ(v)}
        onOpen={handleOnOpenServ}
        style={styles.dropdown}
        labelStyle={styles.label}
        placeholderStyle={styles.placeholder}
        listMode="MODAL"
        translation={{
          NOTHING_TO_SHOW: 'Jasa Servis masih kosong!',
          SEARCH_PLACEHOLDER: 'Ketikan kode/nama jasa',
        }}
        listMessageTextStyle={{color: color.black}}
        mode="SIMPLE"
        searchable={true}
      />
      {/* {!valueServs ? (
          <Text style={{color: color.red}}>Servis harus dipilih</Text>
        ) : null} */}
    </View>
  );

  const WithoutDataServ = (
    <View>
      <OutlinedTextField
        label={'Nama Konsumen'}
        tintColor={color.lightPurple}
        textColor={color.darkGray}
        value={withoutDataValue.name}
        onChangeText={e => onChangeTextCustomer(e, 'name')}
        error={withoutDataValue.name ? '' : 'Nama harus diisi!'}
      />
      <View>
        <Text style={styles.textPhone}>+62</Text>
        <OutlinedTextField
          label={'Nomor Whatsapp'}
          value={withoutDataValue.phone}
          tintColor={color.lightPurple}
          textColor={color.darkGray}
          // eslint-disable-next-line react-native/no-inline-styles
          inputContainerStyle={{paddingStart: 35}}
          // eslint-disable-next-line react-native/no-inline-styles
          labelTextStyle={{
            left: phoneFocus || withoutDataValue.phone ? -30 : 0,
          }}
          keyboardType="number-pad"
          onFocus={() => {
            setPhoneFocus(true);
          }}
          onBlur={() => {
            setPhoneFocus(false);
          }}
          onChangeText={text => {
            if (text.length < 1) {
              text = '0';
            }
            const _text = parseInt(text, 10);
            onChangeTextCustomer(_text.toString(), 'phone');
          }}
        />
      </View>
      <OutlinedTextField
        label={'No Plat'}
        tintColor={color.lightPurple}
        textColor={color.darkGray}
        value={withoutDataValue.plate}
        onChangeText={e =>
          onChangeTextCustomer(e.trim().toUpperCase(), 'plate')
        }
      />
    </View>
  );
  const WithoutDataPart = (
    <View>
      <OutlinedTextField
        label={'Nama Konsumen'}
        tintColor={color.lightPurple}
        textColor={color.darkGray}
        value={withoutDataValue.name}
        onChangeText={e => onChangeTextCustomer(e, 'name')}
        error={withoutDataValue.name ? '' : 'Nama harus diisi!'}
      />
      <View>
        <Text style={styles.textPhone}>+62</Text>
        <OutlinedTextField
          label={'Nomor Whatsapp'}
          value={withoutDataValue.phone}
          tintColor={color.lightPurple}
          textColor={color.darkGray}
          // eslint-disable-next-line react-native/no-inline-styles
          inputContainerStyle={{paddingStart: 35}}
          // eslint-disable-next-line react-native/no-inline-styles
          labelTextStyle={{
            left: phoneFocus || withoutDataValue.phone ? -30 : 0,
          }}
          keyboardType="number-pad"
          onFocus={() => {
            setPhoneFocus(true);
          }}
          onBlur={() => {
            setPhoneFocus(false);
          }}
          onChangeText={text => {
            if (text.length < 1) {
              text = '0';
            }
            const _text = parseInt(text, 10);
            onChangeTextCustomer(_text.toString(), 'phone');
          }}
        />
      </View>
    </View>
  );
  const WithData = (
    <View>
      <DropDownPicker
        open={openCustomer}
        value={valueCustomer}
        items={customerItems}
        setOpen={setOpenCustomer}
        setValue={setValueCustomer}
        setItems={setCustomerItems}
        placeholder={'Nama Konsumen'}
        style={styles.dropdown}
        labelStyle={styles.label}
        placeholderStyle={styles.placeholder}
        listMessageTextStyle={{color: color.black}}
        listMode="MODAL"
        searchable={true}
        searchPlaceholder={'Cari nama/whatsapp konsumen'}
      />
      <Text style={styles.dropdownText}>Pilih konsumen</Text>
      {!valueCustomer ? (
        <Text style={styles.errorInput}>Konsumen harus dipilih!</Text>
      ) : null}
    </View>
  );

  const WithDataVehicle = (
    <View>
      {WithData}
      <View>
        <DropDownPicker
          open={openVehicle}
          value={valueVehicle}
          items={vehicleItems}
          setOpen={setOpenVehicle}
          setValue={setValueVehicle}
          setItems={setVehicleItems}
          placeholder={'Kendaraan'}
          style={styles.dropdown}
          labelStyle={styles.label}
          placeholderStyle={styles.placeholder}
          listMode="MODAL"
          translation={{NOTHING_TO_SHOW: 'Konsumen belum ada kendaraan!'}}
          listMessageTextStyle={{color: color.black}}
        />
        <Text style={styles.dropdownText}>Pilih kendaraan</Text>
        {!valueVehicle ? (
          <Text style={styles.errorInput}>Kendaraan harus dipilih!</Text>
        ) : null}
      </View>
    </View>
  );

  const partDetail = (
    <View style={styles.productContent}>
      <View style={styles.subProductContent}>
        <Text style={styles.textProduct}>Harga Sparepart</Text>
        {valueProducts.p.map((x, i) => (
          <View style={styles.detailContent} key={i}>
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
            valueProducts.p.reduce((a, b) => a + b.price * b.quantity, 0),
            {
              prefix: 'Rp',
              delimiter: ',',
              signPosition: 'beforePrefix',
            },
          )}
        </Text>
      </View>
    </View>
  );
  const servDetail = (
    <View style={styles.subProductContent}>
      <Text style={styles.textProduct}>Biaya Jasa</Text>
      {valueProducts.s.map(s => (
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
          valueProducts.s.reduce((a, b) => a + b.price, 0),
          {
            prefix: 'Rp',
            delimiter: ',',
            signPosition: 'beforePrefix',
          },
        )}
      </Text>
    </View>
  );

  return (
    <Form visible={visible} onClose={onClose} title={title} iosIcon="cart">
      <View style={styles.content}>
        <View>
          <DropDownPicker
            open={openTxType}
            value={valueTxType}
            items={txTypeItems}
            setOpen={setOpenTxType}
            setValue={setValueTxType}
            setItems={setTxTypeItems}
            placeholder={'Jenis Transaksi'}
            style={styles.dropdown}
            labelStyle={styles.label}
            placeholderStyle={styles.placeholder}
            listMessageTextStyle={{color: color.black}}
            listMode="MODAL"
          />
          <Text style={styles.dropdownText}>Pilih Jenis Transaksi</Text>
          {!valueTxType ? (
            <Text style={{color: color.red}}>
              Jenis transaksi harus dipilih
            </Text>
          ) : null}
        </View>
        {valueTxType !== '' && (
          <TouchableOpacity
            style={styles.inputWithBtn}
            onPress={() => setWithoutData(!withoutData)}>
            <Text style={styles.textBtn}>
              <Icon name="ios-repeat" size={16} />{' '}
              {`Input ${!withoutData ? 'manual' : 'otomatis'}`}
            </Text>
          </TouchableOpacity>
        )}
        {valueTxType === TransactionType.SERVICE &&
          (withoutData ? WithoutDataServ : WithDataVehicle)}
        {valueTxType === TransactionType.PART &&
          (withoutData ? WithoutDataPart : WithData)}
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            borderBottomColor: color.gray,
            borderBottomWidth: 1,
            borderStyle: 'dashed',
            marginVertical: 10,
          }}
        />
        {valueTxType === TransactionType.SERVICE && servDropDown()}
        {valueTxType === TransactionType.SERVICE && servDetail}
        {valueTxType !== '' && partDropDown()}
        {valueTxType !== '' && partDetail}
      </View>
      <View>
        {valueTxType !== '' && (
          <>
            <OutlinedTextField
              label="Diskon %"
              value={paymentValue.discount}
              tintColor={color.lightPurple}
              textColor={color.black}
              keyboardType="number-pad"
              onChangeText={t => onChangePayment(t, 'discount')}
            />
            <OutlinedTextField
              label="Jumlah Bayar"
              value={paymentValue.amount}
              tintColor={color.lightPurple}
              textColor={color.black}
              keyboardType="number-pad"
              onChangeText={t => onChangePayment(t, 'amount')}
              error={
                parseInt(paymentValue.amount || '0', 10) <
                amountValue.amountTotal
                  ? 'Jumlah yang dibayar konsumen harus sama atau melebihi total pembayaran!'
                  : ''
              }
            />
          </>
        )}
        <View style={styles.textDiscount}>
          <Text style={styles.textDiscountTitle}>Diskon: </Text>
          <Text style={styles.textDiscountTitle}>{paymentValue.discount}%</Text>
        </View>
        <View style={styles.textDiscount}>
          <Text style={styles.textDiscountTitle}>Total Diskon: </Text>
          <Text style={styles.textDiscountTitle}>
            {formatNumber(amountValue.amountDiscount, {
              prefix: 'Rp',
              delimiter: ',',
              signPosition: 'beforePrefix',
            })}
          </Text>
        </View>
        <View style={styles.textDiscount}>
          <Text style={styles.textDiscountTitle}>Jumlah bayar: </Text>
          <Text style={styles.textDiscountTitle}>
            {formatNumber(parseInt(paymentValue.amount || '0', 10), {
              prefix: 'Rp',
              delimiter: ',',
              signPosition: 'beforePrefix',
            })}
          </Text>
        </View>
        <View style={styles.textDiscount}>
          <Text style={styles.textDiscountTitle}>Kembalian: </Text>
          <Text style={styles.textDiscountTitle}>
            {formatNumber(
              parseInt(paymentValue.amount || '0', 10) -
                amountValue.amountTotal,
              {
                prefix: 'Rp',
                delimiter: ',',
                signPosition: 'beforePrefix',
              },
            )}
          </Text>
        </View>
        <View style={styles.textTotalContent}>
          <Text style={styles.textProductTitle}>Total Pembayaran</Text>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Text style={{color: color.black, fontSize: 18}}>
            {formatNumber(amountValue.amountTotal, {
              prefix: 'Rp',
              delimiter: ',',
              signPosition: 'beforePrefix',
            })}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btnPay}
          onPress={handleOnPayment}
          disabled={
            parseInt(paymentValue.amount || '0', 10) <
              amountValue.amountTotal ||
            parseInt(paymentValue.amount || '0', 10) < 1
          }>
          <Text style={styles.textBtnPay}>
            <Icon name="wallet-outline" color={color.white} size={18} /> Bayar
          </Text>
        </TouchableOpacity>
      </View>
    </Form>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  content: {flex: 1, marginVertical: 10},
  dropdown: {
    borderRadius: 5,
    borderColor: color.gray,
    marginTop: 10,
    borderWidth: 1.2,
    minHeight: 60,
  },
  dropdownText: {
    fontSize: 12,
    color: color.gray,
    marginStart: 10,
    backgroundColor: color.white,
    position: 'absolute',
    top: 1,
    paddingHorizontal: 5,
    elevation: 0.1,
  },
  label: {color: color.darkGray, fontSize: 16},
  placeholder: {fontSize: 16, color: color.gray},
  inputWithBtn: {marginBottom: 10},
  textBtn: {color: color.lightPurple},
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
    fontSize: 16,
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
  errorInput: {color: color.red, marginTop: -5, marginBottom: 10},
  textPhone: {
    color: color.darkGray,
    position: 'absolute',
    left: 5,
    top: 16,
    fontSize: 16,
  },
  textDiscount: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  textDiscountTitle: {color: color.darkGray},
  btnPrint: {
    backgroundColor: color.green,
    marginVertical: 20,
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  textTotalContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: color.gray,
    borderTopWidth: 1,
    paddingVertical: 3,
  },
  btnPay: {
    backgroundColor: color.green,
    marginVertical: 20,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  textBtnPay: {color: color.white, fontSize: 16},
});
