#1 Developer.java

#2 Excel.java

spredfast.js include Developer and Excel (how to run: node spredfast.js)

#3 Question
implement an OOD design then discuss some scalable consideration. 
System consist of following class:

1. StoreAndForwardSystem class this is master of web Service that 1)fetch data from incoming customer event, 2)save event in queue, 
   3)start thread work to post special customer event to remote. one customer has one thread

2. MessageBroker interface and its implement KafakaMessageBroker: handle incoming customer event, parse raw data to return customerEvent

3. Store interface and InMemoryStore: store the customer event extract from message broker.

4. class worker: thread worker responsible for fetch customer data from store then try to deliver it to remote restful api

5. class ForwardExeceptionHandleStrategy: responsible for when call remote restful api error occur, depend on what kind of error, try again after sleep or abort.

6. class Utils:  helper class to do remote restful API request.

7. small interface to identify ERROR classify. 


for scalable consideration:
1. deploy StoreAndFordSystem in multiple server, since they are stateless(identify new customer can use inMemoryStore instead of in-memory Set)
2. store is Map<CustomerID, Queue<Data>) better use distribute queue or NOSQL DB to store customerEvent. 
3. since need keep the order of event for a customer, so each customer use one thread to post data. can deploy StoreAndForwardSystem in multiple server
   so that each server responsible for one range of customerId events. 
4. future consider failure tolerant, if server is down(so that the customer events this server responsible for would stuck). so I think there should add a Master/Slave pattern,
   that one StoreAndForwardSystems works as master, this master would communicate periodically to other slaves through heart-beat, if found failure, fork one 
   more StoreAndForwardSystems to replace.