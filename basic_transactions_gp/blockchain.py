# Paste your version of blockchain.py from the client_mining_p
# folder here
import hashlib
import json
from time import time
from uuid import uuid4

from flask import Flask, jsonify, request
from flask_cors import CORS


class Blockchain(object):
    def __init__(self):
        self.chain = []
        self.current_transactions = []

        # Create the genesis block
        self.new_block(previous_hash=1, proof=100)

    def new_block(self, proof, previous_hash=None):
        """
        Create a new Block in the Blockchain

        A block should have:
        * Index
        * Timestamp
        * List of current transactions
        * The proof used to mine this block
        * The hash of the previous block

        :param proof: <int> The proof given by the Proof of Work algorithm
        :param previous_hash: (Optional) <str> Hash of previous Block
        :return: <dict> New Block
        """

        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.current_transactions,
            'proof': proof,
            'previous_hash': previous_hash or self.hash(self.chain[-1])
        }

        # Reset the current list of transactions
        self.current_transactions = []
        # Append the block to the chain
        self.chain.append(block)
        # Return the new block
        return block

    def hash(self, block):
        """
        Creates a SHA-256 hash of a Block

        :param block": <dict> Block
        "return": <str>
        """

        # Use json.dumps to convert json into a string
        # Use hashlib.sha256 to create a hash
        # It requires a `bytes-like` object, which is what
        # .encode() does.
        # It converts the Python string into a byte string.
        # We must make sure that the Dictionary is Ordered,
        # or we'll have inconsistent hashes

        # TODO: Create the string_object: convert block to a string
        string_object = json.dumps(block, sort_keys=True)
        # TODO: Create the block_string
        block_string = string_object.encode()
        # TODO: Hash this string using sha256
        hash_object = hashlib.sha256(block_string)

        # By itself, the sha256 function returns the hash in a raw string
        # that will likely include escaped characters.
        # This can be hard to read, but .hexdigest() converts the
        # hash to a string of hexadecimal characters, which is
        # easier to work with and understand

        # TODO: Return the hashed block string in hexadecimal format
        hash_string = hash_object.hexdigest()
        return hash_string

    @property
    def last_block(self):
        return self.chain[-1]

    @staticmethod
    def valid_proof(block_string, proof):
        """
        Validates the Proof:  Does hash(block_string, proof) contain 3
        leading zeroes?  Return true if the proof is valid
        :param block_string: <string> The stringified block to use to
        check in combination with `proof`
        :param proof: <int?> The value that when combined with the
        stringified previous block results in a hash that has the
        correct number of leading zeroes.
        :return: True if the resulting hash is a valid proof, False otherwise
        """
        guess = f"{block_string}{proof}".encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        # return True or False
        return guess_hash[:6] == '000000'

    def new_transaction(self, sender, recipient, amount):
        """
        :param sender: <str> Address of the Recipient
        :param recipient: <str> Address of the Recipient
        :param amount: <int> Amount
        :return: <int> The index of the `block` that will hold this transaction
        """
        transaction = {'sender': sender,
                       'recipient': recipient, 'amount': amount}

        self.current_transactions.append(transaction)

        index = len(self.chain) + 1

        return index


# Instantiate our Node
app = Flask(__name__)
# Enable CORS
CORS(app)

# Generate a globally unique address for this node
node_identifier = str(uuid4()).replace('-', '')

# Instantiate the Blockchain
blockchain = Blockchain()


@app.route('/mine', methods=['POST'])
def mine():
    # Receive proof from miner client
    data = request

    # STRETCH: Handle non-json responses
    if not data.is_json:
        return jsonify({'message': 'Invalid data type'}), 400

    data = data.get_json()
    # Validate incoming data
    required_fields = ['id', 'proof']
    if not all(k in data for k in required_fields):
        response = {'message': 'Missing required data'}
        return jsonify(response), 400

    print(f"INCOMING DATA: {data}")
    # Validate proof
    proof = data['proof']
    miner_id = data['id']

    string_object = json.dumps(blockchain.last_block, sort_keys=True)

    if blockchain.valid_proof(string_object, proof):
        blockchain.new_transaction("0", miner_id, 1)

        # Forge the new Block by adding it to the chain with the proof
        previous_hash = blockchain.hash(blockchain.last_block)
        block = blockchain.new_block(proof, previous_hash)

        response = {
            'message': 'New Block Forged',
            'index': block['index'],
            'transactions': block['transactions'],
            'proof': block['proof'],
            'previous_hash': block['previous_hash']
        }

        return jsonify(response), 200

    else:
        response = {'message': 'Invalid proof'}
        return jsonify(response), 422


@app.route('/chain', methods=['GET'])
def full_chain():
    response = {
        # TODO: Return the chain and its current length
        'chain': blockchain.chain,
        'length': len(blockchain.chain)
    }
    return jsonify(response), 200


@app.route('/last_block', methods=['GET'])
def get_last_block():
    response = {
        'last_block': blockchain.last_block
    }
    return jsonify(response), 200


@app.route('/transactions/new', methods=['POST'])
def new_transaction():
    data = request
    # Handle non-json responses
    if not data.is_json:
        return jsonify({'message': 'Invalid data type'}), 400

    data = data.get_json()
    # Validate incoming data
    required_fields = ['sender', 'recipient', 'amount']
    if not all(k in data for k in required_fields):
        response = {'message': 'Missing required data'}
        return jsonify(response), 400
        
    print(f"INCOMING DATA: {data}")
    sender = data['sender']
    recipient = data['recipient']
    amount = int(data['amount'])
    index = blockchain.new_transaction(sender, recipient, amount)

    response = {'message': f'added to block {index}'}

    return jsonify(response), 201


# Run the program on port 5000
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
