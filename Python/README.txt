1-  CALLING SCRIPT :
    python script.py input1.json input2.json
    
2-  EXPECTED FORMAT OF .json FILES
        {
            '_id' : (...),
            'firstname': (...),
            'lastname': (...),
            'password': (...),
            'about': (...),
            'email': (...),
            'phone': (...),
            'zip': (...)
        }

3-  PYTHON VERSION
    python 2.7.12 (not tested for python 3)

4- TEST CASES
    input2_test1.json -> more one person -> match to two users, output one at random
    input2_test3.json -> exactly one person -> match directly without computation 