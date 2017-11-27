import json
import sys
import random

# Levenshtein distance measures the similarity between two strings.
# We will compare the names between two users, ignoring uppercase
def levenshtein(seq1_a, seq2_b):
    seq1 = seq1_a.lower()
    seq2 = seq2_b.lower()
    oneago = None
    thisrow = range(1, len(seq2) + 1) + [0]
    for x in xrange(len(seq1)):
        twoago, oneago, thisrow = oneago, thisrow, [0] * len(seq2) + [x + 1]
        for y in xrange(len(seq2)):
            delcost = oneago[y] + 1
            addcost = thisrow[y - 1] + 1
            subcost = oneago[y - 1] + (seq1[x] != seq2[y])
            thisrow[y] = min(delcost, addcost, subcost)
    return thisrow[len(seq2) - 1]

# argv[1] (first argument pass when calling the script) is a .json file
# with only one user. 
# argv[2] (second argument pass when calling the script) is a .json file
# with at least one user. 
input1 = sys.argv[1]
input2 = sys.argv[2]

# Guaranteed to have one user in unput1.json
data1 = json.load(open(input1))
str1 = data1['firstname']

# Guaranteed to have at least one user
data2 = json.load(open(input2))
flag = len(data2)

# return ID
#print(function(data2, 'Sebastianio'))

if( flag > 1 ) :
    matches = {}
    for a in data2 :
        curValue = levenshtein(str1, a['firstname'])
        matches.update({a['_id'] : curValue})
    # First user to match :
    id_firstperson = min(matches, key=matches.get)
    # Remove last match from list and find a new one
    del matches[id_firstperson]
    id_secondperson = min(matches, key=matches.get)
    print( random.choice([id_firstperson, id_secondperson]))
elif(flag == 1):
    # if there is only one person then simply return
    # the id of the person.
    print data2[0]['_id']
else :
    print 'ERROR: NO USERS IN input2.json' 




