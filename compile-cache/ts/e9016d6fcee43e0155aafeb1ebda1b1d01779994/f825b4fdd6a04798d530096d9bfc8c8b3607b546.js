// Type definitions for Q
// Project: https://github.com/kriskowal/q
// Definitions by: Barrie Nemetchek <https://github.com/bnemetchek>, Andrew Gaspar <https://github.com/AndrewGaspar/>, John Reilly <https://github.com/johnnyreilly>
// Definitions: https://github.com/borisyankov/DefinitelyTyped  
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2F0b20tdHlwZXNjcmlwdC9saWIvdHlwaW5ncy9xL1EuZC50cyIsInNvdXJjZXMiOlsiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2F0b20tdHlwZXNjcmlwdC9saWIvdHlwaW5ncy9xL1EuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5QkFBeUI7QUFDekIsMENBQTBDO0FBQzFDLG9LQUFvSztBQUNwSyxnRUFBZ0U7QUF5VC9EIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVHlwZSBkZWZpbml0aW9ucyBmb3IgUVxuLy8gUHJvamVjdDogaHR0cHM6Ly9naXRodWIuY29tL2tyaXNrb3dhbC9xXG4vLyBEZWZpbml0aW9ucyBieTogQmFycmllIE5lbWV0Y2hlayA8aHR0cHM6Ly9naXRodWIuY29tL2JuZW1ldGNoZWs+LCBBbmRyZXcgR2FzcGFyIDxodHRwczovL2dpdGh1Yi5jb20vQW5kcmV3R2FzcGFyLz4sIEpvaG4gUmVpbGx5IDxodHRwczovL2dpdGh1Yi5jb20vam9obm55cmVpbGx5PlxuLy8gRGVmaW5pdGlvbnM6IGh0dHBzOi8vZ2l0aHViLmNvbS9ib3Jpc3lhbmtvdi9EZWZpbml0ZWx5VHlwZWQgIFxuXG4vKipcbiAqIElmIHZhbHVlIGlzIGEgUSBwcm9taXNlLCByZXR1cm5zIHRoZSBwcm9taXNlLlxuICogSWYgdmFsdWUgaXMgYSBwcm9taXNlIGZyb20gYW5vdGhlciBsaWJyYXJ5IGl0IGlzIGNvZXJjZWQgaW50byBhIFEgcHJvbWlzZSAod2hlcmUgcG9zc2libGUpLlxuICovXG5kZWNsYXJlIGZ1bmN0aW9uIFE8VD4ocHJvbWlzZTogUS5JUHJvbWlzZTxUPik6IFEuUHJvbWlzZTxUPjtcbi8qKlxuICogSWYgdmFsdWUgaXMgbm90IGEgcHJvbWlzZSwgcmV0dXJucyBhIHByb21pc2UgdGhhdCBpcyBmdWxmaWxsZWQgd2l0aCB2YWx1ZS5cbiAqL1xuZGVjbGFyZSBmdW5jdGlvbiBRPFQ+KHZhbHVlOiBUKTogUS5Qcm9taXNlPFQ+O1xuXG5kZWNsYXJlIG1vZHVsZSBRIHtcbiAgICBpbnRlcmZhY2UgSVByb21pc2U8VD4ge1xuICAgICAgICB0aGVuPFU+KG9uRnVsZmlsbD86ICh2YWx1ZTogVCkgPT4gVSB8IElQcm9taXNlPFU+LCBvblJlamVjdD86IChlcnJvcjogYW55KSA9PiBVIHwgSVByb21pc2U8VT4pOiBJUHJvbWlzZTxVPjtcbiAgICB9XG5cbiAgICBpbnRlcmZhY2UgRGVmZXJyZWQ8VD4ge1xuICAgICAgICBwcm9taXNlOiBQcm9taXNlPFQ+O1xuICAgICAgICByZXNvbHZlKHZhbHVlOiBUKTogdm9pZDtcbiAgICAgICAgcmVqZWN0KHJlYXNvbjogYW55KTogdm9pZDtcbiAgICAgICAgbm90aWZ5KHZhbHVlOiBhbnkpOiB2b2lkO1xuICAgICAgICBtYWtlTm9kZVJlc29sdmVyKCk6IChyZWFzb246IGFueSwgdmFsdWU6IFQpID0+IHZvaWQ7XG4gICAgfVxuXG4gICAgaW50ZXJmYWNlIFByb21pc2U8VD4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogTGlrZSBhIGZpbmFsbHkgY2xhdXNlLCBhbGxvd3MgeW91IHRvIG9ic2VydmUgZWl0aGVyIHRoZSBmdWxmaWxsbWVudCBvciByZWplY3Rpb24gb2YgYSBwcm9taXNlLCBidXQgdG8gZG8gc28gd2l0aG91dCBtb2RpZnlpbmcgdGhlIGZpbmFsIHZhbHVlLiBUaGlzIGlzIHVzZWZ1bCBmb3IgY29sbGVjdGluZyByZXNvdXJjZXMgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIGEgam9iIHN1Y2NlZWRlZCwgbGlrZSBjbG9zaW5nIGEgZGF0YWJhc2UgY29ubmVjdGlvbiwgc2h1dHRpbmcgYSBzZXJ2ZXIgZG93biwgb3IgZGVsZXRpbmcgYW4gdW5uZWVkZWQga2V5IGZyb20gYW4gb2JqZWN0LlxuXG4gICAgICAgICAqIGZpbmFsbHkgcmV0dXJucyBhIHByb21pc2UsIHdoaWNoIHdpbGwgYmVjb21lIHJlc29sdmVkIHdpdGggdGhlIHNhbWUgZnVsZmlsbG1lbnQgdmFsdWUgb3IgcmVqZWN0aW9uIHJlYXNvbiBhcyBwcm9taXNlLiBIb3dldmVyLCBpZiBjYWxsYmFjayByZXR1cm5zIGEgcHJvbWlzZSwgdGhlIHJlc29sdXRpb24gb2YgdGhlIHJldHVybmVkIHByb21pc2Ugd2lsbCBiZSBkZWxheWVkIHVudGlsIHRoZSBwcm9taXNlIHJldHVybmVkIGZyb20gY2FsbGJhY2sgaXMgZmluaXNoZWQuXG4gICAgICAgICAqL1xuICAgICAgICBmaW4oZmluYWxseUNhbGxiYWNrOiAoKSA9PiBhbnkpOiBQcm9taXNlPFQ+O1xuICAgICAgICAvKipcbiAgICAgICAgICogTGlrZSBhIGZpbmFsbHkgY2xhdXNlLCBhbGxvd3MgeW91IHRvIG9ic2VydmUgZWl0aGVyIHRoZSBmdWxmaWxsbWVudCBvciByZWplY3Rpb24gb2YgYSBwcm9taXNlLCBidXQgdG8gZG8gc28gd2l0aG91dCBtb2RpZnlpbmcgdGhlIGZpbmFsIHZhbHVlLiBUaGlzIGlzIHVzZWZ1bCBmb3IgY29sbGVjdGluZyByZXNvdXJjZXMgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIGEgam9iIHN1Y2NlZWRlZCwgbGlrZSBjbG9zaW5nIGEgZGF0YWJhc2UgY29ubmVjdGlvbiwgc2h1dHRpbmcgYSBzZXJ2ZXIgZG93biwgb3IgZGVsZXRpbmcgYW4gdW5uZWVkZWQga2V5IGZyb20gYW4gb2JqZWN0LlxuXG4gICAgICAgICAqIGZpbmFsbHkgcmV0dXJucyBhIHByb21pc2UsIHdoaWNoIHdpbGwgYmVjb21lIHJlc29sdmVkIHdpdGggdGhlIHNhbWUgZnVsZmlsbG1lbnQgdmFsdWUgb3IgcmVqZWN0aW9uIHJlYXNvbiBhcyBwcm9taXNlLiBIb3dldmVyLCBpZiBjYWxsYmFjayByZXR1cm5zIGEgcHJvbWlzZSwgdGhlIHJlc29sdXRpb24gb2YgdGhlIHJldHVybmVkIHByb21pc2Ugd2lsbCBiZSBkZWxheWVkIHVudGlsIHRoZSBwcm9taXNlIHJldHVybmVkIGZyb20gY2FsbGJhY2sgaXMgZmluaXNoZWQuXG4gICAgICAgICAqL1xuICAgICAgICBmaW5hbGx5KGZpbmFsbHlDYWxsYmFjazogKCkgPT4gYW55KTogUHJvbWlzZTxUPjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHRoZW4gbWV0aG9kIGZyb20gdGhlIFByb21pc2VzL0ErIHNwZWNpZmljYXRpb24sIHdpdGggYW4gYWRkaXRpb25hbCBwcm9ncmVzcyBoYW5kbGVyLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhlbjxVPihvbkZ1bGZpbGw/OiAodmFsdWU6IFQpID0+IFUgfCBJUHJvbWlzZTxVPiwgb25SZWplY3Q/OiAoZXJyb3I6IGFueSkgPT4gVSB8IElQcm9taXNlPFU+LCBvblByb2dyZXNzPzogRnVuY3Rpb24pOiBQcm9taXNlPFU+O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMaWtlIHRoZW4sIGJ1dCBcInNwcmVhZHNcIiB0aGUgYXJyYXkgaW50byBhIHZhcmlhZGljIGZ1bGZpbGxtZW50IGhhbmRsZXIuIElmIGFueSBvZiB0aGUgcHJvbWlzZXMgaW4gdGhlIGFycmF5IGFyZSByZWplY3RlZCwgaW5zdGVhZCBjYWxscyBvblJlamVjdGVkIHdpdGggdGhlIGZpcnN0IHJlamVjdGVkIHByb21pc2UncyByZWplY3Rpb24gcmVhc29uLlxuICAgICAgICAgKiBcbiAgICAgICAgICogVGhpcyBpcyBlc3BlY2lhbGx5IHVzZWZ1bCBpbiBjb25qdW5jdGlvbiB3aXRoIGFsbFxuICAgICAgICAgKi9cbiAgICAgICAgc3ByZWFkPFU+KG9uRnVsZmlsbGVkOiBGdW5jdGlvbiwgb25SZWplY3RlZD86IEZ1bmN0aW9uKTogUHJvbWlzZTxVPjtcblxuICAgICAgICBmYWlsPFU+KG9uUmVqZWN0ZWQ6IChyZWFzb246IGFueSkgPT4gVSB8IElQcm9taXNlPFU+KTogUHJvbWlzZTxVPjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQSBzdWdhciBtZXRob2QsIGVxdWl2YWxlbnQgdG8gcHJvbWlzZS50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCkuXG4gICAgICAgICAqL1xuICAgICAgICBjYXRjaDxVPihvblJlamVjdGVkOiAocmVhc29uOiBhbnkpID0+IFUgfCBJUHJvbWlzZTxVPik6IFByb21pc2U8VT47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgc3VnYXIgbWV0aG9kLCBlcXVpdmFsZW50IHRvIHByb21pc2UudGhlbih1bmRlZmluZWQsIHVuZGVmaW5lZCwgb25Qcm9ncmVzcykuXG4gICAgICAgICAqL1xuICAgICAgICBwcm9ncmVzcyhvblByb2dyZXNzOiAocHJvZ3Jlc3M6IGFueSkgPT4gYW55KTogUHJvbWlzZTxUPjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogTXVjaCBsaWtlIHRoZW4sIGJ1dCB3aXRoIGRpZmZlcmVudCBiZWhhdmlvciBhcm91bmQgdW5oYW5kbGVkIHJlamVjdGlvbi4gSWYgdGhlcmUgaXMgYW4gdW5oYW5kbGVkIHJlamVjdGlvbiwgZWl0aGVyIGJlY2F1c2UgcHJvbWlzZSBpcyByZWplY3RlZCBhbmQgbm8gb25SZWplY3RlZCBjYWxsYmFjayB3YXMgcHJvdmlkZWQsIG9yIGJlY2F1c2Ugb25GdWxmaWxsZWQgb3Igb25SZWplY3RlZCB0aHJldyBhbiBlcnJvciBvciByZXR1cm5lZCBhIHJlamVjdGVkIHByb21pc2UsIHRoZSByZXN1bHRpbmcgcmVqZWN0aW9uIHJlYXNvbiBpcyB0aHJvd24gYXMgYW4gZXhjZXB0aW9uIGluIGEgZnV0dXJlIHR1cm4gb2YgdGhlIGV2ZW50IGxvb3AuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoaXMgbWV0aG9kIHNob3VsZCBiZSB1c2VkIHRvIHRlcm1pbmF0ZSBjaGFpbnMgb2YgcHJvbWlzZXMgdGhhdCB3aWxsIG5vdCBiZSBwYXNzZWQgZWxzZXdoZXJlLiBTaW5jZSBleGNlcHRpb25zIHRocm93biBpbiB0aGVuIGNhbGxiYWNrcyBhcmUgY29uc3VtZWQgYW5kIHRyYW5zZm9ybWVkIGludG8gcmVqZWN0aW9ucywgZXhjZXB0aW9ucyBhdCB0aGUgZW5kIG9mIHRoZSBjaGFpbiBhcmUgZWFzeSB0byBhY2NpZGVudGFsbHksIHNpbGVudGx5IGlnbm9yZS4gQnkgYXJyYW5naW5nIGZvciB0aGUgZXhjZXB0aW9uIHRvIGJlIHRocm93biBpbiBhIGZ1dHVyZSB0dXJuIG9mIHRoZSBldmVudCBsb29wLCBzbyB0aGF0IGl0IHdvbid0IGJlIGNhdWdodCwgaXQgY2F1c2VzIGFuIG9uZXJyb3IgZXZlbnQgb24gdGhlIGJyb3dzZXIgd2luZG93LCBvciBhbiB1bmNhdWdodEV4Y2VwdGlvbiBldmVudCBvbiBOb2RlLmpzJ3MgcHJvY2VzcyBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEV4Y2VwdGlvbnMgdGhyb3duIGJ5IGRvbmUgd2lsbCBoYXZlIGxvbmcgc3RhY2sgdHJhY2VzLCBpZiBRLmxvbmdTdGFja1N1cHBvcnQgaXMgc2V0IHRvIHRydWUuIElmIFEub25lcnJvciBpcyBzZXQsIGV4Y2VwdGlvbnMgd2lsbCBiZSBkZWxpdmVyZWQgdGhlcmUgaW5zdGVhZCBvZiB0aHJvd24gaW4gYSBmdXR1cmUgdHVybi5cbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIEdvbGRlbiBSdWxlIG9mIGRvbmUgdnMuIHRoZW4gdXNhZ2UgaXM6IGVpdGhlciByZXR1cm4geW91ciBwcm9taXNlIHRvIHNvbWVvbmUgZWxzZSwgb3IgaWYgdGhlIGNoYWluIGVuZHMgd2l0aCB5b3UsIGNhbGwgZG9uZSB0byB0ZXJtaW5hdGUgaXQuXG4gICAgICAgICAqL1xuICAgICAgICBkb25lKG9uRnVsZmlsbGVkPzogKHZhbHVlOiBUKSA9PiBhbnksIG9uUmVqZWN0ZWQ/OiAocmVhc29uOiBhbnkpID0+IGFueSwgb25Qcm9ncmVzcz86IChwcm9ncmVzczogYW55KSA9PiBhbnkpOiB2b2lkO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBjYWxsYmFjayBpcyBhIGZ1bmN0aW9uLCBhc3N1bWVzIGl0J3MgYSBOb2RlLmpzLXN0eWxlIGNhbGxiYWNrLCBhbmQgY2FsbHMgaXQgYXMgZWl0aGVyIGNhbGxiYWNrKHJlamVjdGlvblJlYXNvbikgd2hlbi9pZiBwcm9taXNlIGJlY29tZXMgcmVqZWN0ZWQsIG9yIGFzIGNhbGxiYWNrKG51bGwsIGZ1bGZpbGxtZW50VmFsdWUpIHdoZW4vaWYgcHJvbWlzZSBiZWNvbWVzIGZ1bGZpbGxlZC4gSWYgY2FsbGJhY2sgaXMgbm90IGEgZnVuY3Rpb24sIHNpbXBseSByZXR1cm5zIHByb21pc2UuXG4gICAgICAgICAqL1xuICAgICAgICBub2RlaWZ5KGNhbGxiYWNrOiAocmVhc29uOiBhbnksIHZhbHVlOiBhbnkpID0+IHZvaWQpOiBQcm9taXNlPFQ+O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0byBnZXQgdGhlIG5hbWVkIHByb3BlcnR5IG9mIGFuIG9iamVjdC4gRXNzZW50aWFsbHkgZXF1aXZhbGVudCB0b1xuICAgICAgICAgKiBcbiAgICAgICAgICogcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChvKSB7XG4gICAgICAgICAqICAgICByZXR1cm4gb1twcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgKiB9KTtcbiAgICAgICAgICovXG4gICAgICAgIGdldDxVPihwcm9wZXJ0eU5hbWU6IFN0cmluZyk6IFByb21pc2U8VT47XG4gICAgICAgIHNldDxVPihwcm9wZXJ0eU5hbWU6IFN0cmluZywgdmFsdWU6IGFueSk6IFByb21pc2U8VT47XG4gICAgICAgIGRlbGV0ZTxVPihwcm9wZXJ0eU5hbWU6IFN0cmluZyk6IFByb21pc2U8VT47XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSBmb3IgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBuYW1lZCBtZXRob2Qgb2YgYW4gb2JqZWN0IHdpdGggdGhlIGdpdmVuIGFycmF5IG9mIGFyZ3VtZW50cy4gVGhlIG9iamVjdCBpdHNlbGYgaXMgdGhpcyBpbiB0aGUgZnVuY3Rpb24sIGp1c3QgbGlrZSBhIHN5bmNocm9ub3VzIG1ldGhvZCBjYWxsLiBFc3NlbnRpYWxseSBlcXVpdmFsZW50IHRvXG4gICAgICAgICAqIFxuICAgICAgICAgKiBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICogICAgIHJldHVybiBvW21ldGhvZE5hbWVdLmFwcGx5KG8sIGFyZ3MpO1xuICAgICAgICAgKiB9KTtcbiAgICAgICAgICovXG4gICAgICAgIHBvc3Q8VT4obWV0aG9kTmFtZTogU3RyaW5nLCBhcmdzOiBhbnlbXSk6IFByb21pc2U8VT47XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSBmb3IgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBuYW1lZCBtZXRob2Qgb2YgYW4gb2JqZWN0IHdpdGggdGhlIGdpdmVuIHZhcmlhZGljIGFyZ3VtZW50cy4gVGhlIG9iamVjdCBpdHNlbGYgaXMgdGhpcyBpbiB0aGUgZnVuY3Rpb24sIGp1c3QgbGlrZSBhIHN5bmNocm9ub3VzIG1ldGhvZCBjYWxsLlxuICAgICAgICAgKi9cbiAgICAgICAgaW52b2tlPFU+KG1ldGhvZE5hbWU6IFN0cmluZywgLi4uYXJnczogYW55W10pOiBQcm9taXNlPFU+O1xuICAgICAgICBmYXBwbHk8VT4oYXJnczogYW55W10pOiBQcm9taXNlPFU+O1xuICAgICAgICBmY2FsbDxVPiguLi5hcmdzOiBhbnlbXSk6IFByb21pc2U8VT47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgYSBwcm9taXNlIGZvciBhbiBhcnJheSBvZiB0aGUgcHJvcGVydHkgbmFtZXMgb2YgYW4gb2JqZWN0LiBFc3NlbnRpYWxseSBlcXVpdmFsZW50IHRvXG4gICAgICAgICAqIFxuICAgICAgICAgKiBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICogICAgIHJldHVybiBPYmplY3Qua2V5cyhvKTtcbiAgICAgICAgICogfSk7XG4gICAgICAgICAqL1xuICAgICAgICBrZXlzKCk6IFByb21pc2U8c3RyaW5nW10+O1xuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgc3VnYXIgbWV0aG9kLCBlcXVpdmFsZW50IHRvIHByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB2YWx1ZTsgfSkuXG4gICAgICAgICAqL1xuICAgICAgICB0aGVuUmVzb2x2ZTxVPih2YWx1ZTogVSk6IFByb21pc2U8VT47XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIHN1Z2FyIG1ldGhvZCwgZXF1aXZhbGVudCB0byBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkgeyB0aHJvdyByZWFzb247IH0pLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhlblJlamVjdChyZWFzb246IGFueSk6IFByb21pc2U8VD47XG4gICAgICAgIHRpbWVvdXQobXM6IG51bWJlciwgbWVzc2FnZT86IHN0cmluZyk6IFByb21pc2U8VD47XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgaGF2ZSB0aGUgc2FtZSByZXN1bHQgYXMgcHJvbWlzZSwgYnV0IHdpbGwgb25seSBiZSBmdWxmaWxsZWQgb3IgcmVqZWN0ZWQgYWZ0ZXIgYXQgbGVhc3QgbXMgbWlsbGlzZWNvbmRzIGhhdmUgcGFzc2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgZGVsYXkobXM6IG51bWJlcik6IFByb21pc2U8VD47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgd2hldGhlciBhIGdpdmVuIHByb21pc2UgaXMgaW4gdGhlIGZ1bGZpbGxlZCBzdGF0ZS4gV2hlbiB0aGUgc3RhdGljIHZlcnNpb24gaXMgdXNlZCBvbiBub24tcHJvbWlzZXMsIHRoZSByZXN1bHQgaXMgYWx3YXlzIHRydWUuXG4gICAgICAgICAqL1xuICAgICAgICBpc0Z1bGZpbGxlZCgpOiBib29sZWFuO1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB3aGV0aGVyIGEgZ2l2ZW4gcHJvbWlzZSBpcyBpbiB0aGUgcmVqZWN0ZWQgc3RhdGUuIFdoZW4gdGhlIHN0YXRpYyB2ZXJzaW9uIGlzIHVzZWQgb24gbm9uLXByb21pc2VzLCB0aGUgcmVzdWx0IGlzIGFsd2F5cyBmYWxzZS5cbiAgICAgICAgICovXG4gICAgICAgIGlzUmVqZWN0ZWQoKTogYm9vbGVhbjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgd2hldGhlciBhIGdpdmVuIHByb21pc2UgaXMgaW4gdGhlIHBlbmRpbmcgc3RhdGUuIFdoZW4gdGhlIHN0YXRpYyB2ZXJzaW9uIGlzIHVzZWQgb24gbm9uLXByb21pc2VzLCB0aGUgcmVzdWx0IGlzIGFsd2F5cyBmYWxzZS5cbiAgICAgICAgICovXG4gICAgICAgIGlzUGVuZGluZygpOiBib29sZWFuO1xuICAgICAgICBcbiAgICAgICAgdmFsdWVPZigpOiBhbnk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgYSBcInN0YXRlIHNuYXBzaG90XCIgb2JqZWN0LCB3aGljaCB3aWxsIGJlIGluIG9uZSBvZiB0aHJlZSBmb3JtczpcbiAgICAgICAgICogXG4gICAgICAgICAqIC0geyBzdGF0ZTogXCJwZW5kaW5nXCIgfVxuICAgICAgICAgKiAtIHsgc3RhdGU6IFwiZnVsZmlsbGVkXCIsIHZhbHVlOiA8ZnVsZmxsbWVudCB2YWx1ZT4gfVxuICAgICAgICAgKiAtIHsgc3RhdGU6IFwicmVqZWN0ZWRcIiwgcmVhc29uOiA8cmVqZWN0aW9uIHJlYXNvbj4gfVxuICAgICAgICAgKi9cbiAgICAgICAgaW5zcGVjdCgpOiBQcm9taXNlU3RhdGU8VD47XG4gICAgfVxuXG4gICAgaW50ZXJmYWNlIFByb21pc2VTdGF0ZTxUPiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBcImZ1bGZpbGxlZFwiLCBcInJlamVjdGVkXCIsIFwicGVuZGluZ1wiXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0ZTogc3RyaW5nO1xuICAgICAgICB2YWx1ZT86IFQ7XG4gICAgICAgIHJlYXNvbj86IGFueTtcbiAgICB9XG5cbiAgICAvLyBJZiBubyB2YWx1ZSBwcm92aWRlZCwgcmV0dXJuZWQgcHJvbWlzZSB3aWxsIGJlIG9mIHZvaWQgdHlwZVxuICAgIGV4cG9ydCBmdW5jdGlvbiB3aGVuKCk6IFByb21pc2U8dm9pZD47XG5cbiAgICAvLyBpZiBubyBmdWxmaWxsLCByZWplY3QsIG9yIHByb2dyZXNzIHByb3ZpZGVkLCByZXR1cm5lZCBwcm9taXNlIHdpbGwgYmUgb2Ygc2FtZSB0eXBlXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHdoZW48VD4odmFsdWU6IFQgfCBJUHJvbWlzZTxUPik6IFByb21pc2U8VD47XG5cbiAgICAvLyBJZiBhIG5vbi1wcm9taXNlIHZhbHVlIGlzIHByb3ZpZGVkLCBpdCB3aWxsIG5vdCByZWplY3Qgb3IgcHJvZ3Jlc3NcbiAgICBleHBvcnQgZnVuY3Rpb24gd2hlbjxULCBVPih2YWx1ZTogVCB8IElQcm9taXNlPFQ+LCBvbkZ1bGZpbGxlZDogKHZhbDogVCkgPT4gVSB8IElQcm9taXNlPFU+LCBvblJlamVjdGVkPzogKHJlYXNvbjogYW55KSA9PiBVIHwgSVByb21pc2U8VT4sIG9uUHJvZ3Jlc3M/OiAocHJvZ3Jlc3M6IGFueSkgPT4gYW55KTogUHJvbWlzZTxVPjtcbiAgICBcbiAgICAvKiogXG4gICAgICogQ3VycmVudGx5IFwiaW1wb3NzaWJsZVwiIChhbmQgSSB1c2UgdGhlIHRlcm0gbG9vc2VseSkgdG8gaW1wbGVtZW50IGR1ZSB0byBUeXBlU2NyaXB0IGxpbWl0YXRpb25zIGFzIGl0IGlzIG5vdy5cbiAgICAgKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTc4NCBmb3IgZGlzY3Vzc2lvbiBvbiBpdC5cbiAgICAgKi9cbiAgICAvLyBleHBvcnQgZnVuY3Rpb24gdHJ5KG1ldGhvZDogRnVuY3Rpb24sIC4uLmFyZ3M6IGFueVtdKTogUHJvbWlzZTxhbnk+OyBcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBmYmluZDxUPihtZXRob2Q6ICguLi5hcmdzOiBhbnlbXSkgPT4gVCB8IElQcm9taXNlPFQ+LCAuLi5hcmdzOiBhbnlbXSk6ICguLi5hcmdzOiBhbnlbXSkgPT4gUHJvbWlzZTxUPjtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBmY2FsbDxUPihtZXRob2Q6ICguLi5hcmdzOiBhbnlbXSkgPT4gVCwgLi4uYXJnczogYW55W10pOiBQcm9taXNlPFQ+O1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNlbmQ8VD4ob2JqOiBhbnksIGZ1bmN0aW9uTmFtZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IFByb21pc2U8VD47XG4gICAgZXhwb3J0IGZ1bmN0aW9uIGludm9rZTxUPihvYmo6IGFueSwgZnVuY3Rpb25OYW1lOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogUHJvbWlzZTxUPjtcbiAgICBleHBvcnQgZnVuY3Rpb24gbWNhbGw8VD4ob2JqOiBhbnksIGZ1bmN0aW9uTmFtZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IFByb21pc2U8VD47XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gZGVub2RlaWZ5PFQ+KG5vZGVGdW5jdGlvbjogRnVuY3Rpb24sIC4uLmFyZ3M6IGFueVtdKTogKC4uLmFyZ3M6IGFueVtdKSA9PiBQcm9taXNlPFQ+O1xuICAgIGV4cG9ydCBmdW5jdGlvbiBuYmluZDxUPihub2RlRnVuY3Rpb246IEZ1bmN0aW9uLCB0aGlzQXJnOiBhbnksIC4uLmFyZ3M6IGFueVtdKTogKC4uLmFyZ3M6IGFueVtdKSA9PiBQcm9taXNlPFQ+O1xuICAgIGV4cG9ydCBmdW5jdGlvbiBuZmJpbmQ8VD4obm9kZUZ1bmN0aW9uOiBGdW5jdGlvbiwgLi4uYXJnczogYW55W10pOiAoLi4uYXJnczogYW55W10pID0+IFByb21pc2U8VD47XG4gICAgZXhwb3J0IGZ1bmN0aW9uIG5mY2FsbDxUPihub2RlRnVuY3Rpb246IEZ1bmN0aW9uLCAuLi5hcmdzOiBhbnlbXSk6IFByb21pc2U8VD47XG4gICAgZXhwb3J0IGZ1bmN0aW9uIG5mYXBwbHk8VD4obm9kZUZ1bmN0aW9uOiBGdW5jdGlvbiwgYXJnczogYW55W10pOiBQcm9taXNlPFQ+O1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIG5pbnZva2U8VD4obm9kZU1vZHVsZTogYW55LCBmdW5jdGlvbk5hbWU6IHN0cmluZywgLi4uYXJnczogYW55W10pOiBQcm9taXNlPFQ+O1xuICAgIGV4cG9ydCBmdW5jdGlvbiBucG9zdDxUPihub2RlTW9kdWxlOiBhbnksIGZ1bmN0aW9uTmFtZTogc3RyaW5nLCBhcmdzOiBhbnlbXSk6IFByb21pc2U8VD47XG4gICAgZXhwb3J0IGZ1bmN0aW9uIG5zZW5kPFQ+KG5vZGVNb2R1bGU6IGFueSwgZnVuY3Rpb25OYW1lOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogUHJvbWlzZTxUPjtcbiAgICBleHBvcnQgZnVuY3Rpb24gbm1jYWxsPFQ+KG5vZGVNb2R1bGU6IGFueSwgZnVuY3Rpb25OYW1lOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogUHJvbWlzZTxUPjtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdpdGggYW4gYXJyYXkgY29udGFpbmluZyB0aGUgZnVsZmlsbG1lbnQgdmFsdWUgb2YgZWFjaCBwcm9taXNlLCBvciBpcyByZWplY3RlZCB3aXRoIHRoZSBzYW1lIHJlamVjdGlvbiByZWFzb24gYXMgdGhlIGZpcnN0IHByb21pc2UgdG8gYmUgcmVqZWN0ZWQuXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxUPihwcm9taXNlczogSVByb21pc2U8VD5bXSk6IFByb21pc2U8VFtdPjtcbiAgICBcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IGlzIGZ1bGZpbGxlZCB3aXRoIGFuIGFycmF5IG9mIHByb21pc2Ugc3RhdGUgc25hcHNob3RzLCBidXQgb25seSBhZnRlciBhbGwgdGhlIG9yaWdpbmFsIHByb21pc2VzIGhhdmUgc2V0dGxlZCwgaS5lLiBiZWNvbWUgZWl0aGVyIGZ1bGZpbGxlZCBvciByZWplY3RlZC5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gYWxsU2V0dGxlZDxUPihwcm9taXNlczogSVByb21pc2U8VD5bXSk6IFByb21pc2U8UHJvbWlzZVN0YXRlPFQ+W10+O1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGFsbFJlc29sdmVkPFQ+KHByb21pc2VzOiBJUHJvbWlzZTxUPltdKTogUHJvbWlzZTxQcm9taXNlPFQ+W10+O1xuXG4gICAgLyoqXG4gICAgICogTGlrZSB0aGVuLCBidXQgXCJzcHJlYWRzXCIgdGhlIGFycmF5IGludG8gYSB2YXJpYWRpYyBmdWxmaWxsbWVudCBoYW5kbGVyLiBJZiBhbnkgb2YgdGhlIHByb21pc2VzIGluIHRoZSBhcnJheSBhcmUgcmVqZWN0ZWQsIGluc3RlYWQgY2FsbHMgb25SZWplY3RlZCB3aXRoIHRoZSBmaXJzdCByZWplY3RlZCBwcm9taXNlJ3MgcmVqZWN0aW9uIHJlYXNvbi4gXG4gICAgICogVGhpcyBpcyBlc3BlY2lhbGx5IHVzZWZ1bCBpbiBjb25qdW5jdGlvbiB3aXRoIGFsbC5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gc3ByZWFkPFQsIFU+KHByb21pc2VzOiBJUHJvbWlzZTxUPltdLCBvbkZ1bGZpbGxlZDogKC4uLmFyZ3M6IFRbXSkgPT4gVSB8IElQcm9taXNlPFU+LCBvblJlamVjdGVkPzogKHJlYXNvbjogYW55KSA9PiBVIHwgSVByb21pc2U8VT4pOiBQcm9taXNlPFU+O1xuICAgIFxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBoYXZlIHRoZSBzYW1lIHJlc3VsdCBhcyBwcm9taXNlLCBleGNlcHQgdGhhdCBpZiBwcm9taXNlIGlzIG5vdCBmdWxmaWxsZWQgb3IgcmVqZWN0ZWQgYmVmb3JlIG1zIG1pbGxpc2Vjb25kcywgdGhlIHJldHVybmVkIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZCB3aXRoIGFuIEVycm9yIHdpdGggdGhlIGdpdmVuIG1lc3NhZ2UuIElmIG1lc3NhZ2UgaXMgbm90IHN1cHBsaWVkLCB0aGUgbWVzc2FnZSB3aWxsIGJlIFwiVGltZWQgb3V0IGFmdGVyIFwiICsgbXMgKyBcIiBtc1wiLlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiB0aW1lb3V0PFQ+KHByb21pc2U6IFByb21pc2U8VD4sIG1zOiBudW1iZXIsIG1lc3NhZ2U/OiBzdHJpbmcpOiBQcm9taXNlPFQ+O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIGhhdmUgdGhlIHNhbWUgcmVzdWx0IGFzIHByb21pc2UsIGJ1dCB3aWxsIG9ubHkgYmUgZnVsZmlsbGVkIG9yIHJlamVjdGVkIGFmdGVyIGF0IGxlYXN0IG1zIG1pbGxpc2Vjb25kcyBoYXZlIHBhc3NlZC5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZGVsYXk8VD4ocHJvbWlzZTogUHJvbWlzZTxUPiwgbXM6IG51bWJlcik6IFByb21pc2U8VD47XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIGhhdmUgdGhlIHNhbWUgcmVzdWx0IGFzIHByb21pc2UsIGJ1dCB3aWxsIG9ubHkgYmUgZnVsZmlsbGVkIG9yIHJlamVjdGVkIGFmdGVyIGF0IGxlYXN0IG1zIG1pbGxpc2Vjb25kcyBoYXZlIHBhc3NlZC5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZGVsYXk8VD4odmFsdWU6IFQsIG1zOiBudW1iZXIpOiBQcm9taXNlPFQ+O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBiZSBmdWxmaWxsZWQgd2l0aCB1bmRlZmluZWQgYWZ0ZXIgYXQgbGVhc3QgbXMgbWlsbGlzZWNvbmRzIGhhdmUgcGFzc2VkLlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBkZWxheShtczogbnVtYmVyKTogUHJvbWlzZSA8dm9pZD47XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB3aGV0aGVyIGEgZ2l2ZW4gcHJvbWlzZSBpcyBpbiB0aGUgZnVsZmlsbGVkIHN0YXRlLiBXaGVuIHRoZSBzdGF0aWMgdmVyc2lvbiBpcyB1c2VkIG9uIG5vbi1wcm9taXNlcywgdGhlIHJlc3VsdCBpcyBhbHdheXMgdHJ1ZS5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gaXNGdWxmaWxsZWQocHJvbWlzZTogUHJvbWlzZTxhbnk+KTogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgYSBnaXZlbiBwcm9taXNlIGlzIGluIHRoZSByZWplY3RlZCBzdGF0ZS4gV2hlbiB0aGUgc3RhdGljIHZlcnNpb24gaXMgdXNlZCBvbiBub24tcHJvbWlzZXMsIHRoZSByZXN1bHQgaXMgYWx3YXlzIGZhbHNlLlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBpc1JlamVjdGVkKHByb21pc2U6IFByb21pc2U8YW55Pik6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB3aGV0aGVyIGEgZ2l2ZW4gcHJvbWlzZSBpcyBpbiB0aGUgcGVuZGluZyBzdGF0ZS4gV2hlbiB0aGUgc3RhdGljIHZlcnNpb24gaXMgdXNlZCBvbiBub24tcHJvbWlzZXMsIHRoZSByZXN1bHQgaXMgYWx3YXlzIGZhbHNlLlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBpc1BlbmRpbmcocHJvbWlzZTogUHJvbWlzZTxhbnk+KTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBcImRlZmVycmVkXCIgb2JqZWN0IHdpdGggYTpcbiAgICAgKiBwcm9taXNlIHByb3BlcnR5XG4gICAgICogcmVzb2x2ZSh2YWx1ZSkgbWV0aG9kXG4gICAgICogcmVqZWN0KHJlYXNvbikgbWV0aG9kXG4gICAgICogbm90aWZ5KHZhbHVlKSBtZXRob2RcbiAgICAgKiBtYWtlTm9kZVJlc29sdmVyKCkgbWV0aG9kXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGRlZmVyPFQ+KCk6IERlZmVycmVkPFQ+O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdCBpcyByZWplY3RlZCB3aXRoIHJlYXNvbi5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gcmVqZWN0PFQ+KHJlYXNvbj86IGFueSk6IFByb21pc2U8VD47XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gUHJvbWlzZTxUPihyZXNvbHZlcjogKHJlc29sdmU6ICh2YWw6IFQgfCBJUHJvbWlzZTxUPikgPT4gdm9pZCAsIHJlamVjdDogKHJlYXNvbjogYW55KSA9PiB2b2lkICwgbm90aWZ5OiAocHJvZ3Jlc3M6IGFueSkgPT4gdm9pZCApID0+IHZvaWQgKTogUHJvbWlzZTxUPjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgdmVyc2lvbiBvZiBmdW5jIHRoYXQgYWNjZXB0cyBhbnkgY29tYmluYXRpb24gb2YgcHJvbWlzZSBhbmQgbm9uLXByb21pc2UgdmFsdWVzLCBjb252ZXJ0aW5nIHRoZW0gdG8gdGhlaXIgZnVsZmlsbG1lbnQgdmFsdWVzIGJlZm9yZSBjYWxsaW5nIHRoZSBvcmlnaW5hbCBmdW5jLiBUaGUgcmV0dXJuZWQgdmVyc2lvbiBhbHNvIGFsd2F5cyByZXR1cm5zIGEgcHJvbWlzZTogaWYgZnVuYyBkb2VzIGEgcmV0dXJuIG9yIHRocm93LCB0aGVuIFEucHJvbWlzZWQoZnVuYykgd2lsbCByZXR1cm4gZnVsZmlsbGVkIG9yIHJlamVjdGVkIHByb21pc2UsIHJlc3BlY3RpdmVseS5cbiAgICAgKlxuICAgICAqIFRoaXMgY2FuIGJlIHVzZWZ1bCBmb3IgY3JlYXRpbmcgZnVuY3Rpb25zIHRoYXQgYWNjZXB0IGVpdGhlciBwcm9taXNlcyBvciBub24tcHJvbWlzZSB2YWx1ZXMsIGFuZCBmb3IgZW5zdXJpbmcgdGhhdCB0aGUgZnVuY3Rpb24gYWx3YXlzIHJldHVybnMgYSBwcm9taXNlIGV2ZW4gaW4gdGhlIGZhY2Ugb2YgdW5pbnRlbnRpb25hbCB0aHJvd24gZXhjZXB0aW9ucy5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gcHJvbWlzZWQ8VD4oY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gVCk6ICguLi5hcmdzOiBhbnlbXSkgPT4gUHJvbWlzZTxUPjtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBRIHByb21pc2UuXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZShvYmplY3Q6IGFueSk6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIHByb21pc2UgKGkuZS4gaXQncyBhbiBvYmplY3Qgd2l0aCBhIHRoZW4gZnVuY3Rpb24pLlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBpc1Byb21pc2VBbGlrZShvYmplY3Q6IGFueSk6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB3aGV0aGVyIGEgZ2l2ZW4gcHJvbWlzZSBpcyBpbiB0aGUgcGVuZGluZyBzdGF0ZS4gV2hlbiB0aGUgc3RhdGljIHZlcnNpb24gaXMgdXNlZCBvbiBub24tcHJvbWlzZXMsIHRoZSByZXN1bHQgaXMgYWx3YXlzIGZhbHNlLlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBpc1BlbmRpbmcob2JqZWN0OiBhbnkpOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBhbiBleHBlcmltZW50YWwgdG9vbCBmb3IgY29udmVydGluZyBhIGdlbmVyYXRvciBmdW5jdGlvbiBpbnRvIGEgZGVmZXJyZWQgZnVuY3Rpb24uIFRoaXMgaGFzIHRoZSBwb3RlbnRpYWwgb2YgcmVkdWNpbmcgbmVzdGVkIGNhbGxiYWNrcyBpbiBlbmdpbmVzIHRoYXQgc3VwcG9ydCB5aWVsZC5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gYXN5bmM8VD4oZ2VuZXJhdG9yRnVuY3Rpb246IGFueSk6ICguLi5hcmdzOiBhbnlbXSkgPT4gUHJvbWlzZTxUPjtcbiAgICBleHBvcnQgZnVuY3Rpb24gbmV4dFRpY2soY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIEEgc2V0dGFibGUgcHJvcGVydHkgdGhhdCB3aWxsIGludGVyY2VwdCBhbnkgdW5jYXVnaHQgZXJyb3JzIHRoYXQgd291bGQgb3RoZXJ3aXNlIGJlIHRocm93biBpbiB0aGUgbmV4dCB0aWNrIG9mIHRoZSBldmVudCBsb29wLCB1c3VhbGx5IGFzIGEgcmVzdWx0IG9mIGRvbmUuIENhbiBiZSB1c2VmdWwgZm9yIGdldHRpbmcgdGhlIGZ1bGwgc3RhY2sgdHJhY2Ugb2YgYW4gZXJyb3IgaW4gYnJvd3NlcnMsIHdoaWNoIGlzIG5vdCB1c3VhbGx5IHBvc3NpYmxlIHdpdGggd2luZG93Lm9uZXJyb3IuXG4gICAgICovXG4gICAgZXhwb3J0IHZhciBvbmVycm9yOiAocmVhc29uOiBhbnkpID0+IHZvaWQ7XG4gICAgLyoqXG4gICAgICogQSBzZXR0YWJsZSBwcm9wZXJ0eSB0aGF0IGxldHMgeW91IHR1cm4gb24gbG9uZyBzdGFjayB0cmFjZSBzdXBwb3J0LiBJZiB0dXJuZWQgb24sIFwic3RhY2sganVtcHNcIiB3aWxsIGJlIHRyYWNrZWQgYWNyb3NzIGFzeW5jaHJvbm91cyBwcm9taXNlIG9wZXJhdGlvbnMsIHNvIHRoYXQgaWYgYW4gdW5jYXVnaHQgZXJyb3IgaXMgdGhyb3duIGJ5IGRvbmUgb3IgYSByZWplY3Rpb24gcmVhc29uJ3Mgc3RhY2sgcHJvcGVydHkgaXMgaW5zcGVjdGVkIGluIGEgcmVqZWN0aW9uIGNhbGxiYWNrLCBhIGxvbmcgc3RhY2sgdHJhY2UgaXMgcHJvZHVjZWQuXG4gICAgICovXG4gICAgZXhwb3J0IHZhciBsb25nU3RhY2tTdXBwb3J0OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGluZyByZXNvbHZlIHdpdGggYSBwZW5kaW5nIHByb21pc2UgY2F1c2VzIHByb21pc2UgdG8gd2FpdCBvbiB0aGUgcGFzc2VkIHByb21pc2UsIGJlY29taW5nIGZ1bGZpbGxlZCB3aXRoIGl0cyBmdWxmaWxsbWVudCB2YWx1ZSBvciByZWplY3RlZCB3aXRoIGl0cyByZWplY3Rpb24gcmVhc29uIChvciBzdGF5aW5nIHBlbmRpbmcgZm9yZXZlciwgaWYgdGhlIHBhc3NlZCBwcm9taXNlIGRvZXMpLlxuICAgICAqIENhbGxpbmcgcmVzb2x2ZSB3aXRoIGEgcmVqZWN0ZWQgcHJvbWlzZSBjYXVzZXMgcHJvbWlzZSB0byBiZSByZWplY3RlZCB3aXRoIHRoZSBwYXNzZWQgcHJvbWlzZSdzIHJlamVjdGlvbiByZWFzb24uXG4gICAgICogQ2FsbGluZyByZXNvbHZlIHdpdGggYSBmdWxmaWxsZWQgcHJvbWlzZSBjYXVzZXMgcHJvbWlzZSB0byBiZSBmdWxmaWxsZWQgd2l0aCB0aGUgcGFzc2VkIHByb21pc2UncyBmdWxmaWxsbWVudCB2YWx1ZS5cbiAgICAgKiBDYWxsaW5nIHJlc29sdmUgd2l0aCBhIG5vbi1wcm9taXNlIHZhbHVlIGNhdXNlcyBwcm9taXNlIHRvIGJlIGZ1bGZpbGxlZCB3aXRoIHRoYXQgdmFsdWUuXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmU8VD4ob2JqZWN0OiBJUHJvbWlzZTxUPik6IFByb21pc2U8VD47XG4gICAgLyoqXG4gICAgICogQ2FsbGluZyByZXNvbHZlIHdpdGggYSBwZW5kaW5nIHByb21pc2UgY2F1c2VzIHByb21pc2UgdG8gd2FpdCBvbiB0aGUgcGFzc2VkIHByb21pc2UsIGJlY29taW5nIGZ1bGZpbGxlZCB3aXRoIGl0cyBmdWxmaWxsbWVudCB2YWx1ZSBvciByZWplY3RlZCB3aXRoIGl0cyByZWplY3Rpb24gcmVhc29uIChvciBzdGF5aW5nIHBlbmRpbmcgZm9yZXZlciwgaWYgdGhlIHBhc3NlZCBwcm9taXNlIGRvZXMpLlxuICAgICAqIENhbGxpbmcgcmVzb2x2ZSB3aXRoIGEgcmVqZWN0ZWQgcHJvbWlzZSBjYXVzZXMgcHJvbWlzZSB0byBiZSByZWplY3RlZCB3aXRoIHRoZSBwYXNzZWQgcHJvbWlzZSdzIHJlamVjdGlvbiByZWFzb24uXG4gICAgICogQ2FsbGluZyByZXNvbHZlIHdpdGggYSBmdWxmaWxsZWQgcHJvbWlzZSBjYXVzZXMgcHJvbWlzZSB0byBiZSBmdWxmaWxsZWQgd2l0aCB0aGUgcGFzc2VkIHByb21pc2UncyBmdWxmaWxsbWVudCB2YWx1ZS5cbiAgICAgKiBDYWxsaW5nIHJlc29sdmUgd2l0aCBhIG5vbi1wcm9taXNlIHZhbHVlIGNhdXNlcyBwcm9taXNlIHRvIGJlIGZ1bGZpbGxlZCB3aXRoIHRoYXQgdmFsdWUuXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmU8VD4ob2JqZWN0OiBUKTogUHJvbWlzZTxUPjtcbn1cblxuZGVjbGFyZSBtb2R1bGUgXCJxXCIge1xuICAgIGV4cG9ydCA9IFE7XG59XG4iXX0=
//# sourceURL=/Users/broberto/.atom/packages/atom-typescript/lib/typings/q/Q.d.ts
