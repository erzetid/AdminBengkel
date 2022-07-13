// Copyright (c) 2022 fahrizalm14
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
import {ServStatus} from '../../constant/enum';
import {color} from '../../constant/theme';
import LocalDB from '../../database';
import {generateQueue} from '../../helpers';
import {ICustomer} from '../../model/Customer';
import {IServ, IWorkOrder} from '../../model/Serv';
import {IVehicle} from '../../model/Vehicle';
import {PartDetail} from '../../screens/interface';
import Form from './Form';

interface ServRegisterForm {
  title: string;
  visible: boolean;
  lastQueue: number;
  servs: IServ[];
  onClose: () => void;
  onSave: (wo: IWorkOrder) => Promise<boolean>;
}
interface IDropdown {
  label: string;
  value: string;
}

const ServRegisterForm: FC<ServRegisterForm> = ({
  visible,
  title,
  lastQueue,
  servs,
  onClose,
  onSave,
}) => {
  const customersServices = useMemo(() => LocalDB.customers, []);
  const vehiclesServices = useMemo(() => LocalDB.vehicles, []);
  const partsServices = useMemo(() => LocalDB.parts, []);
  const customers = useRef<ICustomer[]>([]);
  const vehicles = useRef<IVehicle[]>([]);
  const parts = useRef<PartDetail[]>([]);
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
    };
  }, []);
  const defaultMechanic = useMemo(() => 'Tidak ada mekanik', []);
  const emptyWorkOrder = useMemo(() => {
    return {
      analysis: '',
      complaint: '',
      customer: defaultCustomer,
      doneTime: 0,
      kilometer: 0,
      mechanic: defaultMechanic,
      part: [],
      serv: [],
      queue: '',
      startTime: 0,
      status: ServStatus.QUEUE,
      time: 0,
      vehicle: defaultVehicle,
    };
  }, [defaultCustomer, defaultMechanic, defaultVehicle]);
  const isVisible = useMemo(() => visible, [visible]);
  const tileText = useMemo(() => title, [title]);
  const [withoutData, setWithoutData] = useState(true);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [withoutDataValue, setWithoutDataValue] = useState({
    name: '',
    phone: '',
    plate: '',
  });
  const [workOrder, setWorkOrder] = useState<IWorkOrder>(emptyWorkOrder);

  const [openCustomer, setOpenCustomer] = useState(false);
  const [valueCustomer, setValueCustomer] = useState('');
  const [customerItems, setCustomerItems] = useState<IDropdown[]>([]);

  const [openVehicle, setOpenVehicle] = useState(false);
  const [valueVehicle, setValueVehicle] = useState('');
  const [vehicleItems, setVehicleItems] = useState<IDropdown[]>([]);

  const [visibleProduct, setVisibleProduct] = useState(false);

  const [openProductType, setOpenProductType] = useState(false);
  const [valueProductType, setValueProductType] = useState('');
  const [productTypeItems, setProductTypeItems] = useState<IDropdown[]>([
    {label: 'JASA SERVIS', value: '1'},
    {label: 'SPARE PART', value: '2'},
  ]);

  const [openParts, setOpenParts] = useState(false);
  const [valueParts, setValueParts] = useState('');
  const [partsItems, setPartsItems] = useState<IDropdown[]>([]);

  const [openServs, setOpenServs] = useState(false);
  const [valueServs, setValueServs] = useState('');
  const [servsItems, setServsItems] = useState<IDropdown[]>([]);

  const [products, setProducts] = useState<{s: IServ[]; p: PartDetail[]}>({
    s: [],
    p: [],
  });

  useEffect(() => {
    const init = async () => {
      await getData();
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servs]);

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

  const getData = useCallback(async () => {
    const _customers = await customersServices.getAll();
    const _vehicles = await vehiclesServices.getAll();
    const _parts = await partsServices.getAll();
    customers.current = _customers;
    vehicles.current = _vehicles;
    parts.current = _parts;
    setCustomerItems(
      _customers.map(c => {
        const label = `${c.name} (+62${c.phone})`;
        const value = c.id!;
        return {label, value};
      }),
    );
    setPartsItems(
      _parts.map(c => {
        const label = `${c.name} - ${c.code} (${formatNumber(c.price, {
          prefix: 'Rp',
          delimiter: ',',
          signPosition: 'beforePrefix',
        })})`;
        const value = c.id!;
        return {label, value};
      }),
    );
    setServsItems(
      servs.map(c => {
        const label = `${c.name} - ${formatNumber(c.price, {
          prefix: 'Rp',
          delimiter: ',',
          signPosition: 'beforePrefix',
        })}`;
        const value = c.id!;
        return {label, value};
      }),
    );
  }, [customersServices, partsServices, servs, vehiclesServices]);

  const getCustomerAndVehicle = useCallback(async () => {
    let _customer: ICustomer = {...defaultCustomer};
    let _vehicle: IVehicle = {...defaultVehicle};
    if (!withoutData) {
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
        const c = await customersServices.findById(valueCustomer);
        const v = await vehiclesServices.findById(valueVehicle);
        _customer = {...c.data!, id: valueCustomer};
        _vehicle = {...v.data!, id: valueVehicle};
      } catch (error) {}
    }

    return {
      customer: _customer,
      vehicle: _vehicle,
    };
  }, [
    customersServices,
    defaultCustomer,
    defaultVehicle,
    valueCustomer,
    valueVehicle,
    vehiclesServices,
    withoutData,
    withoutDataValue,
  ]);

  const handleOnSave = useCallback(async () => {
    const customerAndVehicle = await getCustomerAndVehicle();
    const _workOrder = {...workOrder};
    const saving = await onSave({
      ..._workOrder,
      customer: customerAndVehicle.customer,
      doneTime: 0,
      mechanic: defaultMechanic,
      part: products.p,
      queue: generateQueue(lastQueue),
      serv: products.s,
      startTime: 0,
      time: Date.now(),
      vehicle: customerAndVehicle.vehicle,
      status: ServStatus.QUEUE,
    });
    if (saving) {
      setWorkOrder(emptyWorkOrder);
      setWithoutDataValue({
        name: '',
        phone: '',
        plate: '',
      });
      setProducts({p: [], s: []});
      setValueCustomer('');
      setValueVehicle('');
      await getData();
    }
  }, [
    getCustomerAndVehicle,
    workOrder,
    onSave,
    defaultMechanic,
    products.p,
    products.s,
    lastQueue,
    emptyWorkOrder,
    getData,
  ]);

  const handleOnClose = useCallback(() => {
    onClose();
  }, [onClose]);
  const onChangeTextCustomer = (
    text: string,
    field: keyof typeof withoutDataValue,
  ) => {
    const _withoutDataValue = {...withoutDataValue};
    setWithoutDataValue({..._withoutDataValue, [field]: text});
  };
  const onChangeWorkOrder = (
    text: string | number,
    field: keyof IWorkOrder,
  ) => {
    const _workOrder = {...workOrder};
    setWorkOrder({..._workOrder, [field]: text});
  };
  const openAddProduct = useCallback(() => {
    setVisibleProduct(true);
  }, []);
  const closeAddProduct = useCallback(() => {
    setVisibleProduct(false);
    setValueProductType('');
    setValueParts('');
    setValueServs('');
  }, []);
  const handleOnAddProduct = useCallback(() => {
    const _products = {...products};
    if (valueProductType === '1' && valueServs) {
      const serv = servs.filter(s => s.id === valueServs);
      serv.length && _products.s.push(serv[0]);
      setProducts(_products);
      closeAddProduct();
    }
    if (valueProductType === '2' && valueParts) {
      const part = parts.current.filter(s => s.id === valueParts);
      if (part.length) {
        const _part = {...part[0], quantity: 1};
        _products.p.push(_part);
        const _parts = parts.current.filter(s => s.id !== valueParts);
        setPartsItems(
          _parts.map(c => {
            const label = `${c.name} - ${c.code} (${formatNumber(c.price, {
              prefix: 'Rp',
              delimiter: ',',
              signPosition: 'beforePrefix',
            })})`;
            const value = c.id!;
            return {label, value};
          }),
        );
      }
      setProducts(_products);
      closeAddProduct();
    }
  }, [
    closeAddProduct,
    products,
    servs,
    valueParts,
    valueProductType,
    valueServs,
  ]);

  const handleDeleteServProduct = useCallback(
    (id: string) => {
      const _products = {...products};
      const s = _products.s.filter(x => x.id !== id);
      setProducts({..._products, s});
    },
    [products],
  );

  const handleDeletePartProduct = useCallback(
    (id: string) => {
      const _products = {...products};
      const _partsItems = [...partsItems];

      const p = _products.p.filter(x => x.id !== id);
      const part = _products.p.filter(x => x.id === id);
      if (part.length) {
        _partsItems.push({
          label: `${part[0].name} - ${part[0].code} (${formatNumber(
            part[0].price,
            {
              prefix: 'Rp',
              delimiter: ',',
              signPosition: 'beforePrefix',
            },
          )})`,
          value: part[0].id!,
        });
        setProducts({..._products, p});
        setPartsItems(_partsItems);
      }
    },
    [partsItems, products],
  );

  const handleOnChangeQty = useCallback(
    (text: string, id: string) => {
      const _products = {...products};
      const part = _products.p.filter(s => s.id === id);
      if (part.length) {
        const index = _products.p.indexOf(part[0]);
        _products.p[index] = {...part[0], quantity: parseInt(text, 10) || 0};
        setProducts(_products);
      }
    },
    [products],
  );

  const WithoutData = (
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
  const WithData = (
    <View>
      <View>
        <DropDownPicker
          open={openCustomer}
          value={valueCustomer}
          items={customerItems}
          setOpen={setOpenCustomer}
          setValue={setValueCustomer}
          setItems={setCustomerItems}
          placeholder={'Nama Konsumen'}
          style={styles.dropdownCustomer}
          labelStyle={styles.labelCustomer}
          placeholderStyle={styles.placeholderCustomer}
          listMessageTextStyle={{color: color.black}}
          listMode="MODAL"
          searchable={true}
          searchPlaceholder={'Cari nama/whatsapp konsumen'}
        />
        <Text style={styles.dropdownCustomerText}>Pilih konsumen</Text>
        {!valueCustomer ? (
          <Text style={styles.errorInput}>Konsumen harus dipilih!</Text>
        ) : null}
      </View>
      <View>
        <DropDownPicker
          open={openVehicle}
          value={valueVehicle}
          items={vehicleItems}
          setOpen={setOpenVehicle}
          setValue={setValueVehicle}
          setItems={setVehicleItems}
          placeholder={'Kendaraan'}
          style={styles.dropdownCustomer}
          labelStyle={styles.labelCustomer}
          placeholderStyle={styles.placeholderCustomer}
          listMode="MODAL"
          translation={{NOTHING_TO_SHOW: 'Konsumen belum ada kendaraan!'}}
          listMessageTextStyle={{color: color.black}}
        />
        <Text style={styles.dropdownCustomerText}>Pilih kendaraan</Text>
        {!valueVehicle ? (
          <Text style={styles.errorInput}>Kendaraan harus dipilih!</Text>
        ) : null}
      </View>
    </View>
  );
  const TypePart = (
    <View>
      <DropDownPicker
        open={openParts}
        value={valueParts}
        items={partsItems}
        setOpen={setOpenParts}
        setValue={setValueParts}
        setItems={setPartsItems}
        placeholder={'Sparepart'}
        style={styles.dropdownCustomer}
        labelStyle={styles.labelCustomer}
        placeholderStyle={styles.placeholderCustomer}
        listMode="MODAL"
        translation={{
          NOTHING_TO_SHOW: 'Sparepart sudah digunakan/masih kosong!',
          SEARCH_PLACEHOLDER: 'Ketikan kode/nama part',
        }}
        listMessageTextStyle={{color: color.black}}
        mode="SIMPLE"
        searchable={true}
      />
      <Text style={styles.dropdownCustomerText}>Pilih Sparepart</Text>
    </View>
  );
  const TypeServ = (
    <View>
      <DropDownPicker
        open={openServs}
        value={valueServs}
        items={servsItems}
        setOpen={setOpenServs}
        setValue={setValueServs}
        setItems={setServsItems}
        placeholder={'Jasa Servis'}
        style={styles.dropdownCustomer}
        labelStyle={styles.labelCustomer}
        placeholderStyle={styles.placeholderCustomer}
        listMode="MODAL"
        translation={{
          NOTHING_TO_SHOW: 'Jasa Servis masih kosong!',
          SEARCH_PLACEHOLDER: 'Ketikan kode/nama jasa',
        }}
        listMessageTextStyle={{color: color.black}}
        mode="SIMPLE"
        searchable={true}
      />
      <Text style={styles.dropdownCustomerText}>Pilih Jasa Servis</Text>
    </View>
  );

  return (
    <Form
      iosIcon="bicycle"
      onClose={handleOnClose}
      title={tileText}
      visible={isVisible}>
      <View style={styles.content}>
        <View>
          <TouchableOpacity
            style={styles.inputWithBtn}
            onPress={() => {
              if (withoutData) {
                setWithoutData(false);
              } else {
                setWithoutData(true);
              }
            }}>
            <Text style={styles.textBtn}>
              <Icon name="ios-repeat" size={16} />{' '}
              {`Input ${
                withoutData ? 'dengan' : 'tanpa'
              } data konsumen & kendaraan`}
            </Text>
          </TouchableOpacity>
          {!withoutData ? WithoutData : WithData}
          <OutlinedTextField
            label={'Kilometer'}
            tintColor={color.lightPurple}
            textColor={color.darkGray}
            value={workOrder.kilometer.toString()}
            maxLength={6}
            keyboardType={'number-pad'}
            onChangeText={t => {
              if (t.length < 1) {
                t = '0';
              }
              onChangeWorkOrder(parseInt(t, 10), 'kilometer');
            }}
          />
          <OutlinedTextField
            label={'Keluhan'}
            tintColor={color.lightPurple}
            textColor={color.darkGray}
            value={workOrder.complaint}
            maxLength={150}
            onChangeText={t => {
              onChangeWorkOrder(t, 'complaint');
            }}
            characterRestriction={150}
            multiline={true}
          />
          <OutlinedTextField
            label={'Analisa'}
            tintColor={color.lightPurple}
            textColor={color.darkGray}
            value={workOrder.analysis}
            maxLength={150}
            onChangeText={t => {
              onChangeWorkOrder(t, 'analysis');
            }}
            multiline={true}
            characterRestriction={150}
          />
        </View>
        <View />
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
        <View style={styles.actionContent}>
          <TouchableOpacity style={styles.btnCancel} onPress={handleOnClose}>
            <Text style={{color: color.white}}>Batal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              !withoutData
                ? withoutDataValue.name !== ''
                  ? styles.btnSave
                  : styles.btnCancel
                : valueCustomer !== '' && valueVehicle !== ''
                ? styles.btnSave
                : styles.btnCancel
            }
            onPress={handleOnSave}
            disabled={
              !withoutData
                ? withoutDataValue.name === ''
                : valueCustomer === '' || valueVehicle === ''
            }>
            <Text style={{color: color.white}}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Form
        iosIcon="cart"
        onClose={closeAddProduct}
        visible={visibleProduct}
        title="Tambah Produk">
        <View style={styles.addProductContent}>
          <View>
            <DropDownPicker
              open={openProductType}
              value={valueProductType}
              items={productTypeItems}
              setOpen={setOpenProductType}
              setValue={setValueProductType}
              setItems={setProductTypeItems}
              placeholder={'Tipe Produk'}
              style={styles.dropdownCustomer}
              labelStyle={styles.labelCustomer}
              placeholderStyle={styles.placeholderCustomer}
              listMessageTextStyle={{color: color.black}}
              listMode="MODAL"
            />
            <Text style={styles.dropdownCustomerText}>Pilih Tipe Produk</Text>
          </View>
          {valueProductType === '1' ? TypeServ : null}
          {valueProductType === '2' ? TypePart : null}
          <View style={styles.actionContent}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={closeAddProduct}>
              <Text style={{color: color.white}}>Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnSave}
              onPress={handleOnAddProduct}>
              <Text style={{color: color.white}}>Tambah</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Form>
    </Form>
  );
};

export default ServRegisterForm;

const styles = StyleSheet.create({
  content: {marginVertical: 10},
  actionContent: {flexDirection: 'row', justifyContent: 'space-between'},
  inputWithBtn: {marginBottom: 10},
  errorInput: {color: color.red, marginTop: -5, marginBottom: 10},
  textBtn: {color: color.lightPurple},
  textPhone: {
    color: color.darkGray,
    position: 'absolute',
    left: 5,
    top: 16,
    fontSize: 16,
  },
  fieldContent: {marginTop: 10},
  dropdownCustomer: {
    borderRadius: 5,
    borderColor: color.gray,
    marginBottom: 10,
    borderWidth: 1.2,
    minHeight: 60,
  },
  dropdownCustomerText: {
    fontSize: 12,
    color: color.gray,
    marginStart: 10,
    backgroundColor: color.white,
    position: 'absolute',
    top: -8,
    paddingHorizontal: 5,
    elevation: 0.1,
  },
  labelCustomer: {color: color.darkGray, fontSize: 16},
  placeholderCustomer: {fontSize: 16, color: color.gray},
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
  btnCancel: {
    backgroundColor: color.gray,
    minHeight: 55,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48.5%',
  },
  btnSave: {
    backgroundColor: color.lightPurple,
    minHeight: 55,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48.5%',
  },
});
