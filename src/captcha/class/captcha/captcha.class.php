<?php
class Captcha
{
	function __construct()
	{
		$this->poi = array();

		//显示圈大小
		$this->poi_show = 74;

		//验证码宽高
		$this->width = 600;
		$this->height = 320;

		//根路径
		$this->rootdir = dirname(dirname(__DIR__));

		//验证码图片缓存路径
		$this->captcha_file = $this->rootdir.'/data/captcha.png';
	}

	/* $clicks    验证点击次数
	 */
	function captcha($clicks=3, $base64=false)
	{
		$clicks = $clicks>4 ? 4 : $clicks;

		if(!$base64){
			header('Content-type: image/png');
		}

		//创建图像
		$bgrand = mt_rand(1, 4);
		$this->im = imagecreatefromjpeg($this->rootdir.'/class/captcha/bg_captcha'.$bgrand.'.jpg');

		//随机范围
		$rand_x[0] = $this->poi_show;
		$rand_x[1] = $this->width - $rand_x[0];
		$rand_y[0] = $this->poi_show;
		$rand_y[1] = $this->height - $rand_y[0];
		$poiclass = $this->poiclass($clicks, $rand_x, $rand_y);

		//生成坐标图像
		$this->poiimg();

		if($base64 === true){
			imagepng($this->im, $this->captcha_file);
			if(file_exists($this->captcha_file)){
				$result['poiclass'] = $poiclass;
				$result['captcha_file'] = $this->captcha_file;
				return $result;
			}else {
				return '';
			}
		}else{
			return imagepng($this->im);
		}
	}

	/* 返回 base64 格式图片
	 * $overtime  过期时间(单位秒)
	 */
	function captcha_base64($clicks=3, $overtime=1800)
	{
		$file = $this->captcha($clicks, true);
		$result['sign'] = $this->rander(32);
		$result['overtime'] = strtotime(date('Y-m-d H:i:s')) + $overtime;
		$result['poiclass'] = $file['poiclass'];
		$result['captcha_icon'] = $file['poiclass']['captcha_icon'];
		$result['base64'] = $this->img_base64($file['captcha_file']);
		unlink($file['captcha_file']);
		return $result;
	}

	//图片转 base64 格式
	function img_base64($imgfile='')
	{
		$img_base64 = '';
		if(file_exists($imgfile)){
			$img_info = getimagesize($imgfile);  //取得图片的大小，类型等

			$fp = fopen($imgfile, 'r');  //图片是否可读权限

			if($fp){
				$filesize = filesize($imgfile);
				$content = fread($fp, $filesize);
				$file_content = chunk_split(base64_encode($content));  //base64编码
				switch($img_info[2]){  //判读图片类型
					case 1: $img_type = 'gif';
					break;
					case 2: $img_type = 'jpg';
					break;
					case 3: $img_type = 'png';
					break;
				}
				$img_base64 = 'data:image/'.$img_type.';base64,'.$file_content;  //合成图片的base64编码
			}
			fclose($fp);
		}
		return $img_base64;  //返回图片的base64
	}

	//生成数字+小写字母随机字符
	function rander($len=3)
	{
		//随机小写字母
		for($i=97;$i<=122;$i++){
			$let[] = chr($i);
		}
		//随机数字
		$num = array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

		$rand[0] = $let;
		$rand[1] = $num;

		$str = '';
		for($i=0;$i<$len;$i++){
			$r = rand(0, 1);
			$r2 = array_rand($rand[$r]);
			$str .= $rand[$r][$r2];
		}
		return $str;
	}

	//生成坐标
	function poiclass($clicks, $r1, $r2)
	{
		$this->poiindex = 0;
		for($i=0;$i<$clicks;$i++){
			$this->poi[] = $this->poifun($r1, $r2);
		}

		//图标
		$imgarr = array('star', 'tri', 'square');
		if($clicks>3){
			$imgarr[] = 'round';
		}

		//储存验证数据
		foreach($this->poi as $key=>$value)
		{
			$icon = $imgarr[mt_rand(0, count($imgarr)-1)];
			$this->icon[] = $icon;
			$value[] = $icon;
			$captcha_poi[] = implode(',', $value);
			$imgarr = array_values(array_diff($imgarr, array($icon)));
		}
		$result['captcha_poi'] = $_SESSION['captcha_poi'] = $captcha_poi;
		$result['captcha_icon'] = $_SESSION['captcha_icon'] = implode(',', $this->icon);
		return $result;
	}

	function poifun($r1, $r2)
	{
		$arr[0] = mt_rand($r1[0], $r1[1]);
		$arr[1] = mt_rand($r2[0], $r2[1]);
		$arr[2] = $arr[0] + $this->poi_show;
		$arr[3] = $arr[1] + $this->poi_show;
		if($this->poicover($arr)){
			if($this->poiindex>50){  //最多尝试50次
				return false;
			}else{
				$this->poiindex++;
				return $this->poifun($r1, $r2);
			}
		}
		return $arr;
	}

	function captcha_icon($str)
	{
		if($str){
			$arr = explode(',', $str);
			return $arr;
		}
	}

	//判断坐标是否重合
	function poicover($arr)
	{
		if($this->poi){
			$flag = false;
			foreach($this->poi as $key=>$value)
			{
				$flag = $this->poicover_rand($value, $arr);
				if($flag===true){
					return $flag;
				}
			}
		}else{
			return false;
		}
	}

	//判断坐标是否重合
	function poicover_rand($array1, $array2)
	{
		$pix_x = 58;  //x轴像素间隔至少58以上
		$pix_x = $this->poi_show + $pix_x;

		$pix_y = 18;  //y轴像素间隔至少18以上
		$pix_y = $this->poi_show + $pix_y;

		$flag = false;
		if(abs($array1[0] - $array2[0]) < $pix_x && abs($array1[1] - $array2[1]) < $pix_y){
			$flag = true;
		}

		return $flag;
	}

	//坐标图像
	function poiimg()
	{
		$i = 0;
		foreach($this->poi as $key=>$value)
		{
			$poiimg = imagecreatefrompng($this->rootdir.'/class/captcha/poi_'.$this->icon[$i].'.png');
			imagesavealpha($poiimg, true);
			imagecopy($this->im, $poiimg, $value[0], $value[1], 0, 0, $this->poi_show, $this->poi_show);
			imagedestroy($poiimg);
			$i++;
		}
	}

	/* 检查验证码
	 * $captcha      客户端坐标
	 * $captcha_ser  服务端数据
	 * $errorval     允许误差值
	 */
	function captcha_check($captcha, $captcha_ser, $errorval=10)
	{
		$flag = true;
		if(!$captcha_ser){
			return false;
		}

		$captcha_arr = explode('||', $captcha);
		$poi_size = $captcha_arr[0];  //点击大小
		//点击大小不能大于显示圈大小
		if($poi_size>=$this->poi_show){
			$poi_size = $this->poi_show - 10;
		}

		//提交的数据
		$poi_arr = explode(',', $captcha_arr[1]);
		foreach($poi_arr as $key=>$value)
		{
			$newpoi_arr[] = $this->poi2rand($poi_size, $value);
		}

		//服务端的数据
		foreach($captcha_ser as $key=>$value)
		{
			$data = explode(',', $value);
			$newcaptcha_ser[] = $data;
			unset($data);
		}

		if(count($newpoi_arr)!=count($newcaptcha_ser)){
			return false;
		}

		foreach($newcaptcha_ser as $key=>$value)
		{
			if(!$this->poi_check($value, $newpoi_arr[$key], $errorval)){
				return false;
			}
		}

		return true;
	}

	//坐标转范围
	function poi2rand($poi_size, $poi)
	{
		$half = $poi_size / 2;
		$arr = explode('-', $poi);
		$newarr[] = $arr[0] - $half;
		$newarr[] = $arr[1] - $half;
		$newarr[] = $arr[0] + $half;
		$newarr[] = $arr[1] + $half;
		return $newarr;
	}

	//坐标重合度验证
	function poi_check($array1, $array2, $errorval)
	{
		$eval = 0;

		//x轴误差
		if($array2[0] < $array1[0]){
			$eval += abs($array2[0] - $array1[0]);
		}
		if($array2[2] > $array1[2]){
			$eval += abs($array2[2] - $array1[2]);
		}

		//y轴误差
		if($array2[1] < $array1[1]){
			$eval += abs($array2[1] - $array1[1]);
		}
		if($array2[3] > $array1[3]){
			$eval += abs($array2[3] - $array1[3]);
		}

		if($eval>$errorval){
			return false;
		}else{
			return true;
		}
	}
}
?>