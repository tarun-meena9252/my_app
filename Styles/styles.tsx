import { Dimensions } from 'react-native';

export const BOX_MARGIN = 4;
export const BOXES_PER_ROW = 3;
export const SCREEN_WIDTH = Dimensions.get("window").width;
export const CONTAINER_HORIZONTAL_MARGIN = 10;
export const BOX_WIDTH =
  (SCREEN_WIDTH - CONTAINER_HORIZONTAL_MARGIN * 2 - BOX_MARGIN * 2 * BOXES_PER_ROW) /
  BOXES_PER_ROW;

const styles = {
  scrollContainer: {
    flexGrow: 1,
    // justifyContent: "flex-start" as const,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  container: {
    marginTop: 10,
    marginLeft: CONTAINER_HORIZONTAL_MARGIN,
    marginRight: CONTAINER_HORIZONTAL_MARGIN,
    // textAlign is not supported on View, so remove it or move to Text styles if needed
  },
  mainText: {
    fontWeight: "bold" as const,
    fontSize: 24,
    marginBottom: 8,
    textAlign: "left" as const,
  },
  subText: {
    fontSize: 14,
    color: "#666",
    textAlign: "left" as const,
    marginBottom: 20,
  },
    label: {
    fontWeight: "bold" as const,
    fontSize: 14,
    marginBottom: 6,
    textAlign: "left" as const,
  },
  input: {
    width: "100%" as const,
    padding: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
    row: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    marginBottom: 8,
  },
  box: {
    flex: 1,
    marginHorizontal: BOX_MARGIN,
    paddingVertical: 24,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center" as const,
    transitionProperty: "box-shadow" as const,
    transitionDuration: "150ms" as const,
  },
  boxSelected: {
    borderColor: "#000",
  },
  boxText: {
    fontSize: 16,
    fontWeight: "500" as const,
  },
    button: {
    backgroundColor: "#000",
    borderRadius: 10,
    width: SCREEN_WIDTH - CONTAINER_HORIZONTAL_MARGIN * 4,
    minHeight: 40,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500" as const,
    fontSize: 16,
  },
};

export default styles;