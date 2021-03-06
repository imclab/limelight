module ApplicationHelper

  def requirejs_base_url
    folder_name(requirejs_main_path)
  end

  def requirejs_main_path
    if Rails.application.assets.find_asset("production.js").present?
      asset_path("production.js")
    else
      asset_path("main.js")
    end
  end

  def requirejs_module_path(asset)
    trim_leading_slash(trim_extension(remove_requirejs_base_url(asset_path(asset))))
  end

  def service_name
    if Limelight::Application.config.available_services.key? params[:slug]
      params[:slug]
    else
      nil
    end
  end

  private

  def folder_name(path)
    path.gsub(%r{/[^./]+.js}, '')
  end

  def trim_leading_slash(remove_requirejs_base_url)
    remove_requirejs_base_url.gsub(%r{^/}, '')
  end

  def trim_extension(path)
    path.gsub(%r{.[^./]+$}, '')
  end

  def remove_requirejs_base_url(asset_path)
    asset_path.gsub(requirejs_base_url, '')
  end

  def main_navigation_link_to(name, path, html_options = {}, &block)
    classes = (html_options[:class] || "").split
    if current_main_navigation_path(params) == path
      classes << "active"
    end
    link_to(name, path, html_options.merge(class: classes.join(" ")), &block)
  end

  def current_main_navigation_path(parameters)
    # Decide which main navigation item to underline
    if parameters['controller'] == 'root'
      root_path
    else
      services_path
    end
  end

end
