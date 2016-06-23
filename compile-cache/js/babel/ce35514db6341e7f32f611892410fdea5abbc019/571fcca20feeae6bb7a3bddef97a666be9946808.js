'use babel';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var File = require('atom').File;
var Fs = require('fs');
var Http = require('follow-redirects').http;
var Mkdirp = require('mkdirp');
var Path = require('path');
var Rmdir = require('rmdir');

var Resource = (function () {
  function Resource() {
    _classCallCheck(this, Resource);
  }

  _createClass(Resource, null, [{
    key: 'collectGarbage',
    value: function collectGarbage(library) {
      Fs.readdir(Resource.BASE_PATH_, function (err, files) {
        if (err) {
          return;
        }

        for (var i = 0; i < files.length; ++i) {
          if (!Fs.lstatSync(Path.join(Resource.BASE_PATH_, files[i])).isDirectory()) {
            continue;
          }

          var ext = Path.extname(files[i]);
          var version = Number.parseInt(ext.substr(1));
          var id = Path.basename(files[i], ext);
          var docset = library.get(id);

          if (!docset || docset.version != version) {
            Rmdir(Path.join(Resource.BASE_PATH_, files[i]), function () {
              return null;
            });
          }
        }
      });
    }
  }, {
    key: 'get',
    value: function get(resourceName, opt_forceReload) {
      var url = Resource.BASE_URL_ + '/' + resourceName;
      var filename = Path.join(Resource.BASE_PATH_, resourceName);

      return Resource.get_(url, opt_forceReload ? '' : filename, filename);
    }
  }, {
    key: 'getVersion',
    value: function getVersion(resourceName, version) {
      var url = Resource.BASE_VERSION_URL_ + '/' + resourceName + '?' + version;

      // Insert the version number as an extension to the directory name containing
      // the given resource.
      var switcheroo = Path.join(Path.dirname(resourceName) + '.' + version.toString(), Path.basename(resourceName));
      var filename = Path.join(Resource.BASE_PATH_, switcheroo);

      return Resource.get_(url, filename, filename);
    }
  }, {
    key: 'get_',
    value: function get_(url, readFilename, writeFilename) {
      return new File(readFilename).read().then(function (result) {
        return result ? result : Promise.reject('ReadFail');
      })['catch'](function (error) {
        return new Promise(function (resolve, reject) {
          Http.get(url, function (response) {
            response.on('error', reject);

            var buffer = '';
            response.on('data', function (chunk) {
              buffer += chunk;
            });
            response.on('end', function () {
              resolve(buffer);
            });
          }).on('error', reject);
        }).then(function (result) {
          Mkdirp(Path.dirname(writeFilename));
          new File(writeFilename).write(result);
          return result;
        })['catch'](function (error) {
          return new File(writeFilename).read().then(function (result) {
            return result ? result : Promise.reject('ReadFail');
          });
        });
      });
    }
  }, {
    key: 'BASE_URL_',
    value: 'http://devdocs.io',
    enumerable: true
  }, {
    key: 'BASE_VERSION_URL_',
    value: 'http://docs.devdocs.io',
    enumerable: true
  }, {
    key: 'BASE_PATH_',
    value: Path.join(Path.dirname(atom.config.getUserConfigPath()), 'packages', 'api-docs', 'data'),
    enumerable: true
  }]);

  return Resource;
})();

module.exports = Resource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9icm9iZXJ0by8uYXRvbS9wYWNrYWdlcy9hcGktZG9jcy9zcmMvcmVzb3VyY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFDOzs7Ozs7QUFFWixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ2xDLElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDOUMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7O0lBRXpCLFFBQVE7V0FBUixRQUFROzBCQUFSLFFBQVE7OztlQUFSLFFBQVE7O1dBS1Msd0JBQUMsT0FBTyxFQUFFO0FBQzdCLFFBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxVQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUs7QUFDOUMsWUFBSSxHQUFHLEVBQUU7QUFDUCxpQkFBTztTQUNSOztBQUVELGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO0FBQ3JDLGNBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO0FBQ3pFLHFCQUFTO1dBQ1Y7O0FBRUQsY0FBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQyxjQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQyxjQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4QyxjQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztBQUUvQixjQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksT0FBTyxFQUFFO0FBQ3hDLGlCQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO3FCQUFNLElBQUk7YUFBQSxDQUFDLENBQUM7V0FDN0Q7U0FDRjtPQUNGLENBQUMsQ0FBQztLQUNKOzs7V0FFUyxhQUFDLFlBQVksRUFBRSxlQUFlLEVBQUU7QUFDeEMsVUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsWUFBWSxDQUFDO0FBQ3BELFVBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQzs7QUFFOUQsYUFBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxlQUFlLEdBQUcsRUFBRSxHQUFHLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUN0RTs7O1dBRWdCLG9CQUFDLFlBQVksRUFBRSxPQUFPLEVBQUU7QUFDdkMsVUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixHQUFHLEdBQUcsR0FBRyxZQUFZLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQzs7OztBQUk1RSxVQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFDakgsVUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDOztBQUU1RCxhQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUMvQzs7O1dBRVUsY0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRTtBQUM1QyxhQUFPLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUMvQixJQUFJLENBQUMsVUFBQSxNQUFNO2VBQUksTUFBTSxHQUFHLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztPQUFBLENBQUMsU0FDdkQsQ0FBQyxVQUFBLEtBQUssRUFBSTtBQUNkLGVBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFLO0FBQ3RDLGNBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQUEsUUFBUSxFQUFJO0FBQ3hCLG9CQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFN0IsZ0JBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNoQixvQkFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQSxLQUFLLEVBQUk7QUFBRSxvQkFBTSxJQUFJLEtBQUssQ0FBQzthQUFFLENBQUMsQ0FBQztBQUNuRCxvQkFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsWUFBTTtBQUFFLHFCQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFBRSxDQUFDLENBQUM7V0FDaEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDeEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUNoQixnQkFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztBQUNwQyxjQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEMsaUJBQU8sTUFBTSxDQUFDO1NBQ2YsQ0FBQyxTQUFNLENBQUMsVUFBQSxLQUFLLEVBQUk7QUFDaEIsaUJBQU8sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ2hDLElBQUksQ0FBQyxVQUFBLE1BQU07bUJBQUksTUFBTSxHQUFHLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztXQUFBLENBQUMsQ0FBQztTQUNuRSxDQUFDLENBQUM7T0FDSixDQUFDLENBQUM7S0FDUjs7O1dBbEVrQixtQkFBbUI7Ozs7V0FDWCx3QkFBd0I7Ozs7V0FDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDOzs7O1NBSHhHLFFBQVE7OztBQXNFZCxNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyIsImZpbGUiOiIvVXNlcnMvYnJvYmVydG8vLmF0b20vcGFja2FnZXMvYXBpLWRvY3Mvc3JjL3Jlc291cmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbmNvbnN0IEZpbGUgPSByZXF1aXJlKCdhdG9tJykuRmlsZTtcbmNvbnN0IEZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IEh0dHAgPSByZXF1aXJlKCdmb2xsb3ctcmVkaXJlY3RzJykuaHR0cDtcbmNvbnN0IE1rZGlycCA9IHJlcXVpcmUoJ21rZGlycCcpO1xuY29uc3QgUGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IFJtZGlyID0gcmVxdWlyZSgncm1kaXInKTtcblxuY2xhc3MgUmVzb3VyY2Uge1xuICBzdGF0aWMgQkFTRV9VUkxfID0gJ2h0dHA6Ly9kZXZkb2NzLmlvJztcbiAgc3RhdGljIEJBU0VfVkVSU0lPTl9VUkxfID0gJ2h0dHA6Ly9kb2NzLmRldmRvY3MuaW8nO1xuICBzdGF0aWMgQkFTRV9QQVRIXyA9IFBhdGguam9pbihQYXRoLmRpcm5hbWUoYXRvbS5jb25maWcuZ2V0VXNlckNvbmZpZ1BhdGgoKSksICdwYWNrYWdlcycsICdhcGktZG9jcycsICdkYXRhJyk7XG5cbiAgc3RhdGljIGNvbGxlY3RHYXJiYWdlKGxpYnJhcnkpIHtcbiAgICBGcy5yZWFkZGlyKFJlc291cmNlLkJBU0VfUEFUSF8sIChlcnIsIGZpbGVzKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoIUZzLmxzdGF0U3luYyhQYXRoLmpvaW4oUmVzb3VyY2UuQkFTRV9QQVRIXywgZmlsZXNbaV0pKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBleHQgPSBQYXRoLmV4dG5hbWUoZmlsZXNbaV0pO1xuICAgICAgICBjb25zdCB2ZXJzaW9uID0gTnVtYmVyLnBhcnNlSW50KGV4dC5zdWJzdHIoMSkpO1xuICAgICAgICBjb25zdCBpZCA9IFBhdGguYmFzZW5hbWUoZmlsZXNbaV0sIGV4dCk7XG4gICAgICAgIGNvbnN0IGRvY3NldCA9IGxpYnJhcnkuZ2V0KGlkKTtcblxuICAgICAgICBpZiAoIWRvY3NldCB8fCBkb2NzZXQudmVyc2lvbiAhPSB2ZXJzaW9uKSB7XG4gICAgICAgICAgUm1kaXIoUGF0aC5qb2luKFJlc291cmNlLkJBU0VfUEFUSF8sIGZpbGVzW2ldKSwgKCkgPT4gbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQocmVzb3VyY2VOYW1lLCBvcHRfZm9yY2VSZWxvYWQpIHtcbiAgICBjb25zdCB1cmwgPSBSZXNvdXJjZS5CQVNFX1VSTF8gKyAnLycgKyByZXNvdXJjZU5hbWU7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBQYXRoLmpvaW4oUmVzb3VyY2UuQkFTRV9QQVRIXywgcmVzb3VyY2VOYW1lKTtcblxuICAgIHJldHVybiBSZXNvdXJjZS5nZXRfKHVybCwgb3B0X2ZvcmNlUmVsb2FkID8gJycgOiBmaWxlbmFtZSwgZmlsZW5hbWUpO1xuICB9XG5cbiAgc3RhdGljIGdldFZlcnNpb24ocmVzb3VyY2VOYW1lLCB2ZXJzaW9uKSB7XG4gICAgY29uc3QgdXJsID0gUmVzb3VyY2UuQkFTRV9WRVJTSU9OX1VSTF8gKyAnLycgKyByZXNvdXJjZU5hbWUgKyAnPycgKyB2ZXJzaW9uO1xuXG4gICAgLy8gSW5zZXJ0IHRoZSB2ZXJzaW9uIG51bWJlciBhcyBhbiBleHRlbnNpb24gdG8gdGhlIGRpcmVjdG9yeSBuYW1lIGNvbnRhaW5pbmdcbiAgICAvLyB0aGUgZ2l2ZW4gcmVzb3VyY2UuXG4gICAgY29uc3Qgc3dpdGNoZXJvbyA9IFBhdGguam9pbihQYXRoLmRpcm5hbWUocmVzb3VyY2VOYW1lKSArICcuJyArIHZlcnNpb24udG9TdHJpbmcoKSwgUGF0aC5iYXNlbmFtZShyZXNvdXJjZU5hbWUpKTtcbiAgICBjb25zdCBmaWxlbmFtZSA9IFBhdGguam9pbihSZXNvdXJjZS5CQVNFX1BBVEhfLCBzd2l0Y2hlcm9vKTtcblxuICAgIHJldHVybiBSZXNvdXJjZS5nZXRfKHVybCwgZmlsZW5hbWUsIGZpbGVuYW1lKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRfKHVybCwgcmVhZEZpbGVuYW1lLCB3cml0ZUZpbGVuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBGaWxlKHJlYWRGaWxlbmFtZSkucmVhZCgpXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQgPyByZXN1bHQgOiBQcm9taXNlLnJlamVjdCgnUmVhZEZhaWwnKSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgSHR0cC5nZXQodXJsLCByZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgIHJlc3BvbnNlLm9uKCdlcnJvcicsIHJlamVjdCk7XG5cbiAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9ICcnO1xuICAgICAgICAgICAgICByZXNwb25zZS5vbignZGF0YScsIGNodW5rID0+IHsgYnVmZmVyICs9IGNodW5rOyB9KTtcbiAgICAgICAgICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsICgpID0+IHsgcmVzb2x2ZShidWZmZXIpOyB9KTtcbiAgICAgICAgICAgIH0pLm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgTWtkaXJwKFBhdGguZGlybmFtZSh3cml0ZUZpbGVuYW1lKSk7XG4gICAgICAgICAgICBuZXcgRmlsZSh3cml0ZUZpbGVuYW1lKS53cml0ZShyZXN1bHQpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEZpbGUod3JpdGVGaWxlbmFtZSkucmVhZCgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdCA/IHJlc3VsdCA6IFByb21pc2UucmVqZWN0KCdSZWFkRmFpbCcpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZXNvdXJjZTtcbiJdfQ==
//# sourceURL=/Users/broberto/.atom/packages/api-docs/src/resource.js
