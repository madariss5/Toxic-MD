const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0ttSGdVK0FVUkNNaE1CMWE3cjZDZTlNcW9qSkdRUGFva1ZyQVkrbWswZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWmYybWp1VkdYSGNGOEhnQzZ2NncxWG9GcVZLbDlha2wwZzFZY1RFWUpBMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIySUcyR1BiZ3ZwQk5uKzNOQzhlWFhFQVRqcSsvT3B2ZFhJTE5TWloybFdzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtRmVBMVljNHcxcmVTNjRPRFRGQUNRejcybE9kMzN5RVIxbmVYQ2U3eHgwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFIYnFOdmhwWE14TFk0dDRGYWo2V0pFUllvTE9zbkNaTEtIbEw2N0ZHbm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik03WEF4dzl6MFJqMDNYR3kyUjlUYThMZGc2S20zazFZdFBERXJ0bFdReXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEQxazRnOGdoWVRzSStGYVNESVN5SHV1S1ZQanRjT0RsYzQ2U3o4OVFsOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWG5WRXFHRWtHMUlTU3ZmRmRzL1hWY2VrK0o3TDhEWTJiNEZnZlF6YXJVWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlN5T1FCUHlpVXRVZ0NySjdZMnBlRlBiYm9YZEtQdlY2bkc0Q0cyWTNydURBQVJxMmxYYkRVUkk2cnhjdXZ2QnpQYmttV1dHSFNrWVlINDd0Tks4b0JRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc2LCJhZHZTZWNyZXRLZXkiOiJFdm1HSVZ6Umxjc21acHQ2T2lnVUhaSzJKOTlpMWRuaTRJcE9MTFdLYUFjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjQ5MTU1NjIzNzgzNDNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQ0VCNERCREQwNzcyRjkyRjM5RjY1QzQ0MkUzRTk2RDIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0MzI2ODAyOX0seyJrZXkiOnsicmVtb3RlSmlkIjoiNDkxNTU2MjM3ODM0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI4OTdBRThCQzlGMTlCQjRCNEEwNjY3OUI4MTc1N0UzMCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQzMjY4MDMwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI0OTE1NTYyMzc4MzQzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkU5QTZEQkE0REYwMURERDAwMkQyNTc2M0Y2Q0U4RTU5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDMyNjgwMzR9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjNOb0tlTkNZUk9XemlEbGFqYnFqanciLCJwaG9uZUlkIjoiM2E2ZDA4MGEtMGE4Zi00MTc4LWEyZjItMTNhYWIzMjIwOWU5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZjUU4wcy82SHNDd0tuTlV5Z3VtRk9MY3YxZz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtN3JQcjN5NVQ0K3NBTXozTlJjU3VjMkY4WUU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUFFHUDNINjQiLCJtZSI6eyJpZCI6IjQ5MTU1NjIzNzgzNDM6MzRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQkxBQ0tTS1ktTUQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BYUHlTMFFyOUdndndZWUJTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjcyVjExbEladmFsSnZGMjYyYk1YdzM0bktnUk45S28zQ09ndys0SDRlUnM9IiwiYWNjb3VudFNpZ25hdHVyZSI6InVMNGhmaFNtUndoZk5rNFdZWWVscTlyQUZDTFU0TWR0eUNyWEpwVU1uOXRuVVNRVVBRUmJlL1lRN3EvSDNraE1yNVkweEFXYmsrN1E4SGNlVEJXeURnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJteU9DQld0YW9xai9rZUtOZzZRT1lPc2dOQXh0SE9rdmthZ0p1ZTdodVpVS2d2czZQdUU1L2xMaEFJSW1aMHBrTkZLMlZJdkdydUFFWWhBUTh0TVpCUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjQ5MTU1NjIzNzgzNDM6MzRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZTlsZGRaU0diMnBTYnhkdXRtekY4TitKeW9FVGZTcU53am9NUHVCK0hrYiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MzI2ODAyOCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJancifQ',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Martin",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "4915563151347",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",              
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BLACKSKY-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/jkJGQRZ/5103aef05fd0d76b.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
