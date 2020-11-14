export default class Utils {
  static async fetchInformation(url) {
    try {
      let response = await fetch(url);
      if (response.status !== 200) {
        return {};
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return {};
    }
  }
}
