import { useTelegram } from "../../context/telegram";

export const Profile = () => {
  const context = useTelegram()
  console.log(context)
  return <div>{JSON.stringify(context.user)}</div>;
};
