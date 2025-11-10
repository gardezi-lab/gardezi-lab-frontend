export const ReactSelectStyles = (themeColor = "#1c2765") => ({
  control: (base, state) => ({
    ...base,
    borderColor: state.isFocused ? themeColor : "#ced4da",
    boxShadow: state.isFocused
      ? `0 0 0 0.25rem rgba(13, 110, 253, 0.25)`
      : "none",
    "&:hover": {
      // borderColor: themeColor,
    },
    borderRadius: "0.375rem",
    minHeight: "38px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#1c2765"
      : state.isFocused
      ? "#1c2765"
      : "#ffffff",
    color: state.isFocused || state.isSelected ? "#ffffff" : "#212529",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#1c2765", // 🔴 turns red while clicking
      color: "#ffffff",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#aeb4c6",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#212529",
  }),
});
