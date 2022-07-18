// Copyright (c) 2022 https://www.adminbengkel.my.id
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {format as formatDate} from 'date-fns';
import id from 'date-fns/locale/id';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ScopedStorage from 'react-native-scoped-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import XLSX from 'xlsx';
import SecondBackground from '../components/SecondBackground';
import SecondHeader from '../components/SecondHeader';
import {CashCategory, CashFlowType} from '../constant/enum';
import {color} from '../constant/theme';
import LocalDB from '../database';
import {ICashFlow} from '../model/CashFlow';
import {IServ} from '../model/Serv';
import {ITransaction} from '../model/Transaction';
import {PartDetail, ReportScreenProps} from './interface';

const ReportScreen: FC<ReportScreenProps> = ({navigation}) => {
  const txCollection = useMemo(() => LocalDB.transactions, []);
  const partCollection = useMemo(() => LocalDB.parts, []);
  const servCollection = useMemo(() => LocalDB.servs, []);
  const cashCollection = useMemo(() => LocalDB.cashes, []);
  const txRef = useRef<ITransaction[]>([]);
  const partRef = useRef<PartDetail[]>([]);
  const servRef = useRef<IServ[]>([]);
  const cashRef = useRef<ICashFlow[]>([]);
  const [openCategory, setOpenCategory] = useState(false);
  const [valueCategory, setValueCategory] = useState<number | null>(null);
  const [itemsCategory, setItemsCategory] = useState<
    {
      label: string;
      value: number;
    }[]
  >([
    {label: 'Data Stok Sparepart', value: 1},
    {label: 'Data Jasa Servis', value: 2},
    {label: 'Penjualan Sparepart', value: 3},
    {label: 'Penjualan Jasa Servis', value: 4},
    {label: 'Data Transaksi', value: 5},
    {label: 'Data Arus Kas', value: 6},
  ]);

  useEffect(() => {
    const init = async () => {
      await initialData();
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const initialData = async () => {
    const _tx = await txCollection.getAll();
    const _part = await partCollection.getAll();
    const _serv = await servCollection.getAll();
    const _cashes = await cashCollection.getAll();
    txRef.current = _tx;
    partRef.current = _part;
    servRef.current = _serv;

    const adapterCashes: ICashFlow[] = _cashes.map(x => {
      return {...x, detail: x, id: `${x.time}`, category: CashCategory.DIRECT};
    });
    const adapterTx: ICashFlow[] = _tx.map(x => {
      return {
        amount: x.finalAmount,
        detail: x,
        no: x.no,
        category: x.type,
        description: 'Penjualan ' + x.type,
        time: x.time,
        type: CashFlowType.INCOME,
      };
    });
    const concatCash = adapterCashes.concat(adapterTx);
    cashRef.current = concatCash;
  };

  // function to handle exporting
  const exportDataToExcel = useCallback(
    async <T,>(data: T[], name: string): Promise<void> => {
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, 'Users');
      const wbout = XLSX.write(wb, {type: 'base64', bookType: 'xlsx'});

      try {
        let dir = await ScopedStorage.openDocumentTree(true);
        await ScopedStorage.writeFile(
          dir.uri,
          name + '.xlsx',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          wbout,
          'base64',
        );
        ToastAndroid.show('Expor data Berhasil.', 3000);
      } catch (error) {
        ToastAndroid.show('Expor data dibatalkan.', 3000);
      }
    },
    [],
  );

  const exportCashFlow = useCallback(
    (start = 0, end = Date.now()) => {
      const data = cashRef.current
        .filter(x => x.time >= start && x.time <= end)
        .map((x, i) => {
          const tanggal = formatDate(x.time, 'dd LLLL yyyy HH:mm', {
            locale: id,
          });
          return {
            ['No']: i + 1,
            ['Tanggal']: tanggal,
            ['No Akun']: x.no,
            ['Deskripsi Akun']: x.description,
            ['Debit']: x.type === CashFlowType.INCOME ? x.amount : '',
            ['Kredit']: x.type === CashFlowType.OUTCOME ? x.amount : '',
            ['Kategori Akun']: x.category,
          };
        });
      exportDataToExcel(
        data,
        `Data_kas${formatDate(Date.now(), '_dd_LLLL_yyyy_HH_mm', {
          locale: id,
        })}`,
      );
    },
    [exportDataToExcel],
  );

  const exportPart = useCallback(() => {
    const data = partRef.current.map((x, i) => {
      const tanggal = formatDate(x.time!, 'dd LLLL yyyy HH:mm', {
        locale: id,
      });
      return {
        ['No']: i + 1,
        ['Kode']: x.code,
        ['Nama']: x.name,
        ['Deskripsi']: x.description,
        ['Kategori']: x.category,
        ['Stok']: x.quantity,
        ['Harga Beli']: x.buyPrice,
        ['Harga Jual']: x.price,
        ['Lokasi']: x.location,
        ['Diperbarui']: tanggal,
      };
    });
    exportDataToExcel(
      data,
      `Data_stok_part${formatDate(Date.now(), '_dd_LLLL_yyyy_HH_mm', {
        locale: id,
      })}`,
    );
  }, [exportDataToExcel]);

  const exportServ = useCallback(() => {
    const data = servRef.current.map((x, i) => {
      const tanggal = formatDate(x.time!, 'dd LLLL yyyy HH:mm', {
        locale: id,
      });
      return {
        ['No']: i + 1,
        ['Kode']: x.code,
        ['Nama']: x.name,
        ['Deskripsi']: x.description,
        ['Kategori']: x.category,
        ['Harga']: x.price,
        ['Waktu Pengerjaan (Menit)']: x.processTime,
        ['Diperbarui']: tanggal,
      };
    });
    exportDataToExcel(
      data,
      `Data_jasa_servis${formatDate(Date.now(), '_dd_LLLL_yyyy_HH_mm', {
        locale: id,
      })}`,
    );
  }, [exportDataToExcel]);

  const exportSell = useCallback(
    (type: 'part' | 'serv', start = 0, end = Date.now()) => {
      const parts: any = [];
      const servs: any = [];
      txRef.current
        .filter(x => x.time >= start && x.time <= end)
        .forEach(tx => {
          const tanggal = formatDate(tx.time, 'dd LLLL yyyy HH:mm', {
            locale: id,
          });
          const plate = tx.customer.vehicle?.length
            ? tx.customer.vehicle[0].plate
            : '';
          tx.products.p.length &&
            tx.products.p.forEach(x => {
              parts.push({
                ['Tanggal']: tanggal,
                ['Nomor Transaksi']: tx.no,
                ['No Konsumen']: tx.customer.no,
                ['Nama Konsumen']: tx.customer.name,
                ['Hp Konsumen']: '62' + tx.customer.phone,
                ['Kode']: x.code,
                ['Nama']: x.name,
                ['Deskripsi']: x.description,
                ['Kategori']: x.category,
                ['Jumlah']: x.quantity,
                ['Harga Beli']: x.buyPrice,
                ['Harga Jual']: x.price,
                ['Lokasi']: x.location,
              });
            });
          tx.products.s.length &&
            tx.products.s.forEach(x => {
              servs.push({
                ['Tanggal']: tanggal,
                ['Nomor Transaksi']: tx.no,
                ['No Konsumen']: tx.customer.no,
                ['Nama Konsumen']: tx.customer.name,
                ['Hp Konsumen']: '62' + tx.customer.phone,
                ['No Plat']: plate,
                ['Kode']: x.code,
                ['Nama']: x.name,
                ['Deskripsi']: x.description,
                ['Harga']: x.price,
                ['Waktu Pengerjaan (Menit)']: x.processTime,
              });
            });
        });
      if (type === 'part') {
        exportDataToExcel(
          parts,
          `Penjualan_part${formatDate(Date.now(), '_dd_LLLL_yyyy_HH_mm', {
            locale: id,
          })}`,
        );
      } else if (type === 'serv') {
        exportDataToExcel(
          servs,
          `Penjualan_servis${formatDate(Date.now(), '_dd_LLLL_yyyy_HH_mm', {
            locale: id,
          })}`,
        );
      }
    },
    [exportDataToExcel],
  );

  const exportTx = useCallback(
    (start = 0, end = Date.now()) => {
      const data = txRef.current
        .filter(x => x.time >= start && x.time <= end)
        .map((tx, i) => {
          const tanggal = formatDate(tx.time, 'dd LLLL yyyy HH:mm', {
            locale: id,
          });
          const plate = tx.customer.vehicle?.length
            ? tx.customer.vehicle[0].plate
            : '';

          return {
            ['No']: i + 1,
            ['Tanggal']: tanggal,
            ['Nomor Transaksi']: tx.no,
            ['No Konsumen']: tx.customer.no,
            ['Nama Konsumen']: tx.customer.name,
            ['Hp Konsumen']: '62' + tx.customer.phone,
            ['No Plat']: plate,
            ['Status']: tx.status,
            ['Jenis']: tx.type,
            ['Pajak']: tx.tax,
            ['Pajak Rp']: tx.amountTax,
            ['Diskon %']: tx.discount,
            ['Diskon Rp']: tx.amountDiscount,
            ['Nominal Servis']: tx.totalServ,
            ['Nominal Sparepart']: tx.totalPart,
            ['Nominal Sebelum Diskon dan Pajak']: tx.amount,
            ['Nominal Akhir']: tx.finalAmount,
          };
        });
      exportDataToExcel(
        data,
        `Transaksi${formatDate(Date.now(), '_dd_LLLL_yyyy_HH_mm', {
          locale: id,
        })}`,
      );
    },
    [exportDataToExcel],
  );

  const handleOnExport = useCallback(() => {
    switch (valueCategory) {
      case 1:
        exportPart();
        break;

      case 2:
        exportServ();
        break;

      case 3:
        exportSell('part');
        break;

      case 4:
        exportSell('serv');
        break;

      case 5:
        exportTx();
        break;

      case 6:
        exportCashFlow();
        break;

      default:
        ToastAndroid.show('Pilih kategori terlebih dahulu', 3000);
        break;
    }
  }, [
    exportCashFlow,
    exportPart,
    exportSell,
    exportServ,
    exportTx,
    valueCategory,
  ]);

  return (
    <SecondBackground>
      <SecondHeader
        title="Laporan"
        navigation={navigation}
        titleColor={color.white}
      />
      <View
        style={{backgroundColor: color.white, borderRadius: 5, padding: 10}}>
        <DropDownPicker
          open={openCategory}
          value={valueCategory}
          items={itemsCategory}
          setOpen={setOpenCategory}
          setValue={setValueCategory}
          setItems={setItemsCategory}
          placeholder={'Pilih kategori'}
          style={styles.dropdownCategory}
          labelStyle={styles.labelCategory}
          placeholderStyle={styles.placeholderCategory}
          listMode="MODAL"
        />
        <Text style={styles.dropdownCategoryText}>Kategori</Text>
        <TouchableOpacity style={styles.btnExport} onPress={handleOnExport}>
          <Text style={styles.textBtnExport}>
            <Icon name="grid" color={color.white} size={16} /> Export Data
          </Text>
        </TouchableOpacity>
      </View>
    </SecondBackground>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  text: {
    color: color.black,
  },
  dropdownCategory: {
    borderRadius: 5,
    borderColor: color.gray,
    marginBottom: 5,
    borderWidth: 1.2,
    minHeight: 60,
  },
  dropdownCategoryText: {
    fontSize: 12,
    color: color.gray,
    marginStart: 16,
    backgroundColor: color.white,
    position: 'absolute',
    top: 4,
    paddingHorizontal: 5,
    elevation: 0.1,
  },
  labelCategory: {color: color.darkGray, fontSize: 16},
  placeholderCategory: {fontSize: 16, color: color.gray},
  btnExport: {
    backgroundColor: color.green,
    marginVertical: 5,
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  textBtnExport: {color: color.white, fontSize: 16},
});
