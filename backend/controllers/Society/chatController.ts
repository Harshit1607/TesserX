import Chats from "../../models/Chats";
import Company from "../../models/Companies";
import Group from "../../models/Group";
import Society from "../../models/Societies";
import { getIo } from '../../sockets/socket';

export const createNewChat = async ({ text, user, group, isMedia }) => {
  if (!text || !user || !group) {
    throw new Error("Missing text, user, or group ID");
  }

  const GroupData = await Group.findById(group);
  if (!GroupData || GroupData.Users.length !== 2) {
    throw new Error("Group must have exactly two users (soc & com)");
  }

  const chatData = {
    message: {
      message: text,
      sentBy: user,
      viewedBy: [user]
    },
    Users: GroupData.Users,
    Group: group,
  };

  const newChat = new Chats(chatData);
  await newChat.save();

  return newChat;
};


export const getLatestChat = async ({ group }) => {
  return await Chats.findOne({ Group: group }).sort({ createdAt: -1 }).exec();
};


export const viewChat = async ({ group, user }) => {
  await Chats.updateMany(
    {
      Group: group,
      'message.viewedBy': { $ne: user }
    },
    {
      $addToSet: { 'message.viewedBy': user }
    }
  );

  const updatedChats = await Chats.find({
    Group: group,
    'message.viewedBy': user
  });

  return updatedChats;
};

export const openGroup = async (req, res) => {
  const { user, other, group } = req.body;
  try {
    if (group) {
      const groupChat = await Group.findById(group._id);
      return res.status(200).json({ groupChat });
    }

    // Check if a DM group between these two users already exists
    let groupChat = await Group.findOne({
      Users: { $all: [user._id, other._id], $size: 2 }
    });

    if (groupChat) {
      return res.status(200).json({ groupChat });
    }

    // Create new group
    const userArray: any[] = [];
    const userIds = [user._id, other._id];

    const userElem = await Society.findById(user._id, '_id name');
    const otherElem = await Company.findById(other._id, '_id name');

    if(!userElem || !otherElem) return;

    if (userElem) userArray.push(userElem);
    if (otherElem) userArray.push(otherElem);

    groupChat = new Group({ UserDetails: userArray, Users: userIds });
    await groupChat.save();

    const io = getIo();
    io.to(other._id).emit("NewGroupCreated", { groupChat });

    res.status(200).json({ groupChat });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to open group' });
  }
};

export const getGroup = async (groupId) => {
  const GroupData = await Group.findById(groupId);
  return GroupData;
};
