export 'unsupported_barcode.dart'
    if (dart.library.html) 'web_barcode.dart'
    if (dart.library.io) 'io_device_barcode.dart';
