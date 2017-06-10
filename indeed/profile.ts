/*
http://www.1point3acres.com/bbs/thread-223228-1-1.html
就是一个简历系统（Profile system）, 实现update和query。我的办法是建个Profile class，
里面成员变量有一个Profile id，和一个List，List里面是Map， 因为它query的时候要根据版本号（version number），
所以用list里面的index对应。每次更新的时候就把最新的map复制出来，修改再塞回List里面去。
case一共是20个，超时了9个 .说实现一个简历的系统，3个API
1) update(String profileId, String field, String value); //这时候版本要+1
2) get(String profileId, int version); //找对应版本的field和value
3) getField(String profileId, int version, String field); //找对应的value
一上来没什么想法，只能硬做。写一个类，里面包含四个变量，profileId, field, value还有version
然后建map，key是id，value就是后面的三个东西吧。
value应该也弄个map，key是version，value再来个map，key是field。
HackerRank 新题，我的解法不够优，很多大数据点超时了。大概是一个简历的系统，实现三个 API
每个用户有一个 profile，然后 profile 里有各种 field 和对应的 value，第一次 update 之后的 version 是 1，
再 update version 变成 2，依此类推。
*/