namespace java com.creditkarma

// Should include paths relative to this file
include "exception.thrift"
include "core/status_type.thrift"

service MyService {
  string ping(1: status_type.StatusType status) throws (1: exception.MyException exp)
}