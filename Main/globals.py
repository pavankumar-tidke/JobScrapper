from faker import Faker
import typesense, random, string, subprocess
fake = Faker('en_US')

class GLOBALS :
    
    ''' GLOBAL VALUES '''
    colorList = ['blue', 'green', 'yellow', 'red', 'pink', 'purple', 'indigo', 'teal', 'cyan', 'sky', 'rose', 'fuchsia', 'orange', 'amber']
    session_name = 'user_session_details' 
    admin_session_name = 'admin_details'
    
    
    
    ''' TYPESENSE OPERATIONS ''' 
    # Authentication with Typesense    
    def typesenceAuth(self):                # server api-key = NB9hloK2Yj8QSIePqaPCRrUGUSfApvyWX915Kmzmyw78Ga0C
        try:
            client = typesense.Client({
            'nodes': [{
                # 'host': 'testp.feelyprivacy.com',  # For Typesense Cloud use xxx.a1.typesense.net
                'host': 'localhost',  # For Typesense Cloud use xxx.a1.typesense.net
                'port': '8108',       # For Typesense Cloud use port no. 443
                'protocol': 'http'    # For Typesense Cloud use https
            }],
                'api_key': 'xyz',
                'connection_timeout_seconds': 10
            })
            return client
        except Exception as e:
            print("_Exception ", e)
    
      
    # creating typesenses collection\
    def createCollection(self, collection_name) :
        try :
            client  = self.typesenceAuth()
            client.collections.create({
                'name': collection_name,  # name is your database table name
                'fields': [
                    {
                    'name'  :  'id',
                    'type'  :  'string'
                    },
                    {
                    'name'  :  'name',
                    'type'  :  'string'
                    },
                    {
                    'name'  :  'email',
                    'type'  :  'string'
                    },
                    {
                    'name'  :  'password',
                    'type'  :  'string'
                    }, 
                    {
                    'name'  :  'status',
                    'type'  :  'string'
                    }, 
                    {
                    'name'  :  'created_at',
                    'type'  :  'string'
                    }, 
                    {
                    'name'  :  'updated_at',
                    'type'  :  'string'
                    }, 
                ], 
            }) 
            
            return True
            
        except Exception as e:
            return e
    
    # shop collection creation
    def createShopCollection(self) :
        try :
            client  = self.typesenceAuth()
            client.collections.create({
                'name': 'shops',  # name is your database table name
                'fields': [
                    {
                    'name'  :  'id',
                    'type'  :  'string'
                    },
                    {
                    'name'  :  'user_id',
                    'type'  :  'string'
                    },
                    {
                    'name'  :  'user_name',
                    'type'  :  'string'
                    },
                    {
                    'name'  :  'shop_id',
                    'type'  :  'string'
                    },
                    {
                    'name'  :  'shop_name',
                    'type'  :  'string'
                    },
                    {
                    'name'  :  'shop_address',
                    'type'  :  'string'
                    }, 
                    {
                    'name'  :  'shop_images',
                    'type'  :  'string[]', 
                    }, 
                    {
                    'name'  :  'opening_time',
                    'type'  :  'string'
                    }, 
                    {
                    'name'  :  'closing_time',
                    'type'  :  'string'
                    }, 
                    {
                    'name'  :  'status',
                    'type'  :  'string'
                    }, 
                    {
                    'name'  :  'created_at',
                    'type'  :  'string'
                    }, 
                    {
                    'name'  :  'updated_at',
                    'type'  :  'string'
                    }, 
                ], 
            }) 
            
            return True
            
        except Exception as e:
            return e
            
    # query collection
    def createQueryCollection(self) :
        try :
            client  = self.typesenceAuth()
            client.collections.create({
                'name': 'query',  # name is your database table name
                'fields': [
                    {
                    'name'  :  'id',
                    'type'  :  'string'
                    },
                    {
                    'name'  :  'user_id',
                    'type'  :  'string'
                    }, 
                    {
                    'name'  :  'queryfolder_id',
                    'type'  :  'string'
                    },
                    {
                    'name'  :  'user_name',
                    'type'  :  'string'
                    },
                    {
                    'name'  :  'query_title',
                    'type'  :  'string'
                    },
                    {
                    'name'  :  'query_text',
                    'type'  :  'string'
                    },
                    {
                    'name'  :  'query_ans',
                    'type'  :  'string'
                    }, 
                    {
                    'name'  :  'status',
                    'type'  :  'string'
                    }, 
                    {
                    'name'  :  'created_at',
                    'type'  :  'string'
                    }, 
                    {
                    'name'  :  'updated_at',
                    'type'  :  'string'
                    }, 
                ], 
            }) 
            
            return True
            
        except Exception as e:
            return e
        
         
    # searching in collection 
    # def searchTypesence(self, collection_name, query, search_by):
    #     try:
    #         client = self.typesenceAuth() 
    #         search_parameters = {
    #             'q'         : query,
    #             'query_by'  : search_by,                   # query_by is the entity by which yo are searching, it can be changed with yuor column name.
    #             'per_page' : 100                        # if you are implimenting the pagination then per_page value is useful
    #         } 
    #         data = client.collections[collection_name].documents.search(search_parameters) 
    #         return data

    #     except ValueError as e:
    #         print("_ValueError:: ", e)
    #     except TypeError as e:
    #         print("_TypeError:: ", e)
    #     except Exception as e:
    #         print("_Exception:: ", e)
            
    # check collection  that is available or not
    def checkCollection(self, collection_name) : 
        try:
            client = self.typesenceAuth()
            response = client.collections[collection_name].retrieve() 
            return True  
        
        except typesense.exceptions.RequestMalformed as e: 
            return f'RequestMalformed'  
        except typesense.exceptions.ObjectNotFound as e: 
            return False
    
    # retrive a collection
    def fetchCollectionData(self, collection_name) :
        try :
            client = self.typesenceAuth();
            # data = client.collections[collection_name].retrieve()
            data = client.collections[collection_name].documents.export()
            return data

        except Exception as e:
            return e

    # fetch all collections
    def fetchAllCollections(self) :
        try :
            client = self.typesenceAuth()
            data = client.collections.retrieve()
            return data

        except Exception as e:
            return e
        
    # To delete the collection in the Typesence
    def deleteCollection(self, collection_name):
        try:
            # authentication with Typesense
            client = self.typesenceAuth() 
            client.collections[collection_name].delete()
            return True

        except Exception as e:
            print("_Exception:: ", e)
    
       
            
    ''' RANDOM DATA GENERATOR '''
    
    # random gender generator   
    def randomGender(self) :
        return random.choice(['M', 'F'])

    # andom ID generator
    def randID(self) : 
        try:
            id_length = 10
            characters = string.ascii_uppercase + string.ascii_lowercase + string.digits
            id = ''.join(random.choice(characters) for _ in range(id_length))
            return id
        except Exception as e:
            print(f'An exception occurred -- {e}')
        
    
    # random moble no generator   
    def randNumber(self) :
        return str(random.randint(1000000000, 9999999999))

    # random address generator   
    def randomAddress(self) :
        return fake.address()[0:10]

    # random name generator   
    def randomName(self) :
        return fake.name()[0:4]
    


    ''' SESSION HANDLING '''
    
    # session settings
    def setUserSession(self, request, session_name, session_options) :
        """
        This function performs some operation on two arguments.

        @param arg1 The first argument, which will be clled itself.
        @type arg1: obj

        @param arg2: it is the request.
        @type arg2: str
        
        @param arg3: it is the request.
        @type arg3: str
        
        @param arg4: it is the request.
        @type arg4: str

        @return: The result of the operation, which will be an integer.
        @rtype: int
        """
        try: 
            request.session[session_name] = session_options
            return 0
        except Exception as e:
            print("_Exception session create ", e)
            
    # get session
    def getUserSession(self, request, session_name) :
        try:  
            return request.session[session_name]
        except Exception as e:
            print("_Exception ", e)
    
    def destroyUserSession(self, request) :
        try:
            request.session.flush()
            request.session.clear() 
            request.session.clear_expired()
            return 0
        except Exception as e:
            print("_Exception ", e)
            
            
    def destroyAdminSession(self, request) :
        try:
            request.session.flush()
            request.session.clear() 
            request.session.clear_expired()
            return 0
        except Exception as e:
            print("_Exception ", e)
            
            
            
    ''' ADMIN GLOBALS '''
    
    # session settings
    def AdminsetSession(self, request, options) :
        try:
            request.session['user_details'] = options
            return 0
        except Exception as e:
            print("_Exception ", e)
            
    # get sessi0n
    def AdmingetSession(self, request) :
        try: 
            return request.session['user_details']
        except Exception as e:
            print("_Exception ", e)
    
    def AdminsessionDestroy(self, request) :
        try:
            request.session.flush()
            request.session.clear() 
            request.session.clear_expired()
            return 0
        except Exception as e:
            print("_Exception ", e)
 
    def test(self) :
        return 'dry rtrn'
 
    
    ''' MSQUE SETTING '''
    
    def get_mosque_time(self, timezoneOffset):
        try:
            return subprocess.check_output(["python3", "praytimes.py", timezoneOffset]).decode('utf-8')
        except Exception as e:
          print(f'An exception occurred: {e}')