const fs = require("node:fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const dataContacts = await fs.readFile(contactsPath);
    return JSON.parse(dataContacts);
  } catch (error) {
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const dataContacts = await listContacts();
    return dataContacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const dataContacts = await listContacts();
    const indexDeleteContact = dataContacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (indexDeleteContact === -1) {
      return null;
    }
    const [result] = dataContacts.splice(indexDeleteContact, 1);
    await fs.writeFile(contactsPath, JSON.stringify(dataContacts, null, 2));
    return result;
  } catch (error) {
    return null;
  }
}

async function addContact(data) {
  try {
    const dataContacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      ...data,
    };
    dataContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(dataContacts, null, 2));
    return newContact;
  } catch (error) {
    return null;
  }
}

async function updateContact(contactId, data) {
  try {
    const dataContacts = await listContacts();
    const indexUpdateContact = dataContacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (indexUpdateContact === -1) {
      return null;
    }
    dataContacts[indexUpdateContact] = {
      ...dataContacts[indexUpdateContact],
      ...data,
    };
    await fs.writeFile(contactsPath, JSON.stringify(dataContacts, null, 2));
    return dataContacts[indexUpdateContact];
  } catch (error) {
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
