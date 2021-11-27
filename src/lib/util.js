import moment from 'moment';

export function username(value) {
	return value.toUpperCase();
}

export function address(value) {
	if (value == null) return '';

	let val = value.substring(0, 40) + '..';

	return val.replace(/(?:_| |\b)(\w)/g, function ($1) {
		return $1.replace('_', ' ');
	});
}

export function _address(value) {
	if (value == null) return '';

	return value.replace(/(?:_| |\b)(\w)/g, function ($1) {
		return $1.replace('_', ' ');
	});
}

export function currency(value) {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		maximumSignificantDigits: 3,
	}).format(value);
}

export function _currency(value) {
	return new Intl.NumberFormat('id-ID', {
		maximumSignificantDigits: 3,
	}).format(value);
}

export function active(value) {
	if (value == 1) return 'aktif';
	else return 'tidak aktif';
}

export function format_date(value) {
	if (value) {
		return moment(String(value)).format('YYYY / MM / DD HH:mm:ss');
	}
}

export function formatRupiah(angka){
	var	number_string = angka.toString(),
	sisa 	= number_string.length % 3,
	rupiah 	= number_string.substr(0, sisa),
	ribuan 	= number_string.substr(sisa).match(/\d{3}/g);

	if (ribuan) {
		var separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}
	return rupiah
}

export function formatdate(value) {
	if (value) {
		return moment(String(value)).format('YYYY / MM / DD');
	}
}

export function kecamatan(value) {
	var re = /([^_]+)/g; 
	var res = [];
	var m
	 
	while ((m = re.exec(value)) !== null) {
	    res.push(m[0]);
	}

	return res[2]
}

export function kabupaten(value) {
	var re = /([^_]+)/g; 
	var res = [];
	var m
	 
	while ((m = re.exec(value)) !== null) {
	    res.push(m[0]);
	}

	return res[3]
}

export function provinsi(value) {
	var re = /([^_]+)/g; 
	var res = [];
	var m
	 
	while ((m = re.exec(value)) !== null) {
	    res.push(m[0]);
	}

	return res[4]
}

export function alamat(value) {
	var re = /([^_]+)/g; 
	var res = [];
	var m
	 
	while ((m = re.exec(value)) !== null) {
	    res.push(m[0]);
	}

	return res[0]
}




