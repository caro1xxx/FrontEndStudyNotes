> AES加密为对称密钥加密，加密和解密都是用同一个解密规则，AES加密过程是在一个4×4的字节矩阵上运作，这个矩阵又称为"状态(state)"，因为密钥和加密块要在矩阵上多次的迭代，置换，组合，所以对加密快和密钥的字节数都有一定的要求，AES密钥长度的最少支持为128、192、256，加密块分组长度128位。这种加密模式有一个最大弱点：甲方必须把加密规则告诉乙方，否则无法解密。保存和传递密钥，就成了最头疼的问题

```py
from Crypto.Cipher import AES
#密钥必须是16,24,32位的
key  = '1234567890123456'     
data = 'abc'
BS = 16
#加密函数，如果text不足16位就补足为16位，
pad = lambda s: s + (BS-len(s) % BS) * chr(BS - len(s) % BS)
#加密
cipher = AES.new(key)
encrypted = cipher.encrypt(pad(m))
#解密
cipher = AES.new(key)
encrypted = cipher.decrypt(pad(m))
```



