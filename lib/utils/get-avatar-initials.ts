export default function getAvatarInitials(name: string) {
  const names = name.split(" ");
  let initials;
  if (names.length > 1) {
    initials = `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  } else {
    initials = name.charAt(0).toUpperCase();
  }
  return initials;
}
