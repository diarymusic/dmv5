<?php
class dSql
{
    private static $servername = 'localhost';
    private static $username = 'root';
    private static $password = '123456';
    private static $dbname = 'diarymusicoffi_c';
    private static $charset = "utf8"; //字符编码
    private static $port = "3306"; //端口号
    private $conn = null;
    private $stmt;
    function __construct()
    {
        $this->conn = new mysqli(self::$servername, self::$username, self::$password, self::$dbname);
    
        if (!$this->conn) {
            http_response_code(404);
            exit();
        } else {
            // echo "连接成功！";
        }
        $this->conn->query("set names " . self::$charset);
    }
    //执行sql语句
    public function bind($sql = null, $types = null, ...$params)
    {
        if ($types && $params) {
            //有参数
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param($types, ...$params);
            if (!$stmt->execute()) {
                return false; // 执行失败
            }
            $result = $stmt->get_result();

            if (strpos(strtolower($sql), 'select') === 0) {
                // 查询语句，返回结果集
                return $result;
            } else {
                // 非查询语句，返回执行结果
                return $stmt->affected_rows;
            }

        } else {
            //无参数
            $res = $this->conn->query($sql);
            if (strpos(strtolower($sql), 'select') === 0) {
                // 查询语句，返回结果集
                return $res;
            } else {
                // 非查询语句，返回执行结果
                return $this->conn->affected_rows;
            }
        }
    }
    public function multi($sql){
        $this->conn->multi_query($sql);
    }
    public function close()
    {
        // 关闭数据库连接
        $this->conn->close();
    }
/*public function sql($sql){
if($this->conn->query($sql)){
while ($row = $result->fetch_assoc()) {
// 处理查询结果
// ...
}
return ;
}else{
return false;
}

}*/
}

class UUID
{
    public static function create_uuid($prefix = "")
    {
        $chars = md5(uniqid(mt_rand(), true));
        $uuid = substr($chars, 0, 8) . '-'
            . substr($chars, 8, 4) . '-'
            . substr($chars, 12, 4) . '-'
            . substr($chars, 16, 4) . '-'
            . substr($chars, 20, 12);
        return $prefix . $uuid;
    }
}